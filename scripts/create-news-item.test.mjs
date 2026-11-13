// Tests for create-news-item.mjs. Run with: node --test scripts/create-news-item.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

import {
    HEADINGS,
    parseSections,
    findImageUrl,
    parseIssue,
    nextId,
    addNewsItem,
    downloadImage,
    run,
} from './create-news-item.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const fixtureBody = path.join(here, 'fixtures', 'news-issue.md');
const realNewsFile = path.join(repoRoot, 'assets', 'images', 'news', 'news.json');

/** Builds an issue body the way GitHub renders the form. */
function issueBody(answers) {
    return Object.entries(answers)
        .map(([key, value]) => `### ${HEADINGS[key]}\n\n${value}`)
        .join('\n\n');
}

const goodAnswers = {
    title: 'News!',
    author: 'John Cronin',
    date: '2026-10-20',
    text: 'News news news.',
    link: '_No response_',
    image: '_No response_',
};

/** A copy of the real news.json in a temp folder, so tests never touch the repo's file. */
async function tempNewsFile() {
    const dir = await mkdtemp(path.join(tmpdir(), 'news-test-'));
    const file = path.join(dir, 'news.json');
    await copyFile(realNewsFile, file);
    return { dir, file };
}

function fakeFetch({ status = 200, type = 'image/png', bytes = Buffer.from('fake image') } = {}) {
    const calls = [];
    const impl = async (url) => {
        calls.push(url);
        return {
            ok: status >= 200 && status < 300,
            status,
            headers: { get: () => type },
            arrayBuffer: async () => bytes,
        };
    };
    return { impl, calls };
}

test('reads every answer under its heading, including Windows line endings', () => {
    const body = issueBody(goodAnswers).replace(/\n/g, '\r\n');
    const sections = parseSections(body);
    assert.equal(sections[HEADINGS.title], 'News!');
    assert.equal(sections[HEADINGS.author], 'John Cronin');
    assert.equal(sections[HEADINGS.text], 'News news news.');
});

test('treats "_No response_" as empty', () => {
    const sections = parseSections(issueBody(goodAnswers));
    assert.equal(sections[HEADINGS.link], '');
    assert.equal(sections[HEADINGS.image], '');
});

test('keeps paragraphs in the details', () => {
    const fields = parseIssue(issueBody({ ...goodAnswers, text: 'First.\n\nSecond.' }));
    assert.equal(fields.text, 'First.\n\nSecond.');
});

test('# characters inside the details are kept', () => {
    // Only lines that start with "### " are headings; "#3" or "###abc" are not.
    const fields = parseIssue(issueBody({ ...goodAnswers, text: 'Room #3 was ###full.' }));
    assert.equal(fields.text, 'Room #3 was ###full.');
});

test('finds the image in both formats GitHub uses for uploads', () => {
    const url = 'https://github.com/user-attachments/assets/abc123';
    assert.equal(findImageUrl(`![image](${url})`), url);
    assert.equal(findImageUrl(`<img width="1200" alt="Image" src="${url}" />`), url);
    assert.equal(findImageUrl(''), null);
});

test('parses the sample issue in scripts/fixtures', async () => {
    const fields = parseIssue(await readFile(fixtureBody, 'utf8'));
    assert.equal(fields.title, 'Students carry water across campus for The Water Walk');
    assert.equal(fields.author, 'John Cronin');
    assert.equal(fields.date, '2026-10-20');
    assert.match(fields.text, /Blue CoLab carried buckets/);
    assert.equal(fields.link, undefined);
    assert.match(fields.imageUrl, /^https:\/\/github\.com\/user-attachments\/assets\//);
});

test('lists every missing required field in one error', () => {
    const body = issueBody({ ...goodAnswers, title: '_No response_', text: '_No response_' });
    assert.throws(
        () => parseIssue(body),
        (error) => {
            assert.match(error.message, /What is the title\?/);
            assert.match(error.message, /What are the details\?/);
            return true;
        }
    );
});

test('rejects dates that are not real YYYY-MM-DD dates', () => {
    for (const date of ['10/20/2026', '2026-13-01', '2026-02-30', 'soon']) {
        assert.throws(() => parseIssue(issueBody({ ...goodAnswers, date })), /YYYY-MM-DD/, date);
    }
});

test("uses the issue's creation date when the date is left blank", () => {
    const body = issueBody({ ...goodAnswers, date: '_No response_' });
    const fields = parseIssue(body, { issueDate: '2026-10-21T17:32:00Z' });
    assert.equal(fields.date, '2026-10-21');
});

test('rejects a link that is not a web address', () => {
    const body = issueBody({ ...goodAnswers, link: 'pace.edu/news' });
    assert.throws(() => parseIssue(body), /http:\/\/ or https:\/\//);
});

test('new ids are numbers, one higher than the highest existing id', () => {
    assert.equal(nextId([{ id: 1 }, { id: 7 }, { id: 3 }]), 8);
    assert.equal(nextId([]), 1);
});

test('adds the entry newest first, in the same shape as existing entries', () => {
    const news = [
        { id: 1, title: 'Old', date: '2026-03-02', text: 'a' },
        { id: 2, title: 'Same day', date: '2026-10-20', text: 'b' },
    ];
    const fields = parseIssue(issueBody(goodAnswers));
    const result = addNewsItem(news, fields, { issueNumber: '42', image: 'news-3.png' });
    assert.deepEqual(result.entry, {
        id: 3,
        title: 'News!',
        date: '2026-10-20',
        image: 'news-3.png',
        text: 'News news news.',
        author: 'John Cronin',
        sourceIssue: 42,
    });
    assert.deepEqual(
        result.news.map((item) => item.id),
        [3, 2, 1]
    );
    assert.equal(news.length, 2, 'the original list is not changed');
});

test('refuses to add the same issue twice', () => {
    const news = [{ id: 1, title: 'Already here', date: '2026-10-20', text: 'a', sourceIssue: 42 }];
    const fields = parseIssue(issueBody(goodAnswers));
    assert.throws(() => addNewsItem(news, fields, { issueNumber: 42 }), /already been added/);
});

test('saves a downloaded image with the right file extension', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'news-img-'));
    const { impl } = fakeFetch({ type: 'image/jpeg' });
    const name = await downloadImage('https://example.com/x', {
        dir,
        baseName: 'news-5',
        fetchImpl: impl,
    });
    assert.equal(name, 'news-5.jpg');
    assert.deepEqual(await readdir(dir), ['news-5.jpg']);
});

test('refuses uploads that are not images, and failed downloads', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'news-img-'));
    const notImage = fakeFetch({ type: 'text/html' }).impl;
    await assert.rejects(
        downloadImage('https://example.com/x', { dir, baseName: 'a', fetchImpl: notImage }),
        /isn't a PNG, JPG, WebP or GIF/
    );
    const missing = fakeFetch({ status: 404 }).impl;
    await assert.rejects(
        downloadImage('https://example.com/x', { dir, baseName: 'a', fetchImpl: missing }),
        /HTTP 404/
    );
});

test('full run: updates a copy of the real news.json and saves the image', async () => {
    const { dir, file } = await tempNewsFile();
    const before = JSON.parse(await readFile(file, 'utf8'));
    const { impl, calls } = fakeFetch({ type: 'image/png' });

    const result = await run({
        argv: ['--body-file', fixtureBody, '--news-file', file],
        env: { ISSUE_NUMBER: '200' },
        fetchImpl: impl,
        log: () => {},
    });

    const after = JSON.parse(await readFile(file, 'utf8'));
    assert.equal(after.length, before.length + 1);
    assert.equal(after[0].id, nextId(before));
    assert.equal(after[0].image, `news-${after[0].id}.png`);
    assert.ok(existsSync(path.join(dir, after[0].image)), 'image saved next to news.json');
    assert.equal(calls.length, 1);
    assert.equal(result.entry.sourceIssue, 200);

    // Every entry still passes the same check Dock.tsx uses (isNewsEntry).
    for (const item of after) {
        assert.equal(typeof item.id, 'number');
        for (const key of ['title', 'date', 'text']) assert.equal(typeof item[key], 'string');
    }
    // Existing entries are kept exactly as they were.
    assert.deepEqual(after.slice(1), before);

    // Running the same issue again is refused, and the file is left alone.
    await assert.rejects(
        run({
            argv: ['--body-file', fixtureBody, '--news-file', file],
            env: { ISSUE_NUMBER: '200' },
            fetchImpl: impl,
            log: () => {},
        }),
        /already been added/
    );
    assert.equal(calls.length, 1, 'no second download for a duplicate');
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), after);
});

test('--dry-run changes nothing', async () => {
    const { file } = await tempNewsFile();
    const before = await readFile(file, 'utf8');
    const { impl, calls } = fakeFetch();
    await run({
        argv: ['--body-file', fixtureBody, '--news-file', file, '--dry-run'],
        env: {},
        fetchImpl: impl,
        log: () => {},
    });
    assert.equal(await readFile(file, 'utf8'), before);
    assert.equal(calls.length, 0);
});

test('works from the command line with ISSUE_BODY, and fails with a clear message', async () => {
    const { file } = await tempNewsFile();
    const script = path.join(here, 'create-news-item.mjs');
    const body = issueBody(goodAnswers);
    const { stdout } = await promisify(execFile)(
        process.execPath,
        [script, '--news-file', file, '--no-download'],
        {
            env: { ...process.env, ISSUE_BODY: body, ISSUE_NUMBER: '7' },
        }
    );
    assert.match(stdout, /Added news item #\d+/);

    const bad = issueBody({ ...goodAnswers, author: '_No response_' });
    await assert.rejects(
        promisify(execFile)(process.execPath, [script, '--news-file', file], {
            env: { ...process.env, ISSUE_BODY: bad },
        }),
        (error) => error.code === 1 && /Who is the author\?/.test(error.stderr)
    );
});

test(
    'headings match the labels in the issue form',
    {
        skip:
            !existsSync(path.join(repoRoot, '.github/ISSUE_TEMPLATE/news_item.yml')) &&
            'news_item.yml is not on this branch',
    },
    async () => {
        const form = await readFile(
            path.join(repoRoot, '.github/ISSUE_TEMPLATE/news_item.yml'),
            'utf8'
        );
        for (const label of Object.values(HEADINGS)) {
            assert.ok(
                form.includes(`label: ${label}`),
                `news_item.yml has no field labeled "${label}"`
            );
        }
    }
);

// Keep the temp-file helper honest: writing a temp file must not leave news.json.tmp behind.
test('leaves no temporary file behind', async () => {
    const { dir, file } = await tempNewsFile();
    await run({
        argv: ['--body-file', fixtureBody, '--news-file', file, '--no-download'],
        env: {},
        log: () => {},
    });
    assert.ok(!(await readdir(dir)).some((name) => name.endsWith('.tmp')));
});
