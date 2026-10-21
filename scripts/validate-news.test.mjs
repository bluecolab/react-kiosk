// Tests for validate-news.mjs. Run with: node --test scripts/validate-news.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateNews, run } from './validate-news.mjs';

const repoNews = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../assets/images/news/news.json'
);

const good = {
    id: 1,
    title: 'News!',
    date: '2026-10-20',
    text: 'News news news.',
    author: 'John Cronin',
};

test("the repo's current news.json is valid", async () => {
    assert.deepEqual(await run(repoNews), []);
});

test('a good entry has no problems', () => {
    assert.deepEqual(
        validateNews([good, { ...good, id: 2, image: 'photo.jpg', link: 'https://pace.edu' }]),
        []
    );
});

test('catches ids the kiosk would hide, and repeated ids', () => {
    const problems = validateNews([{ ...good, id: 'abc-123' }, good, { ...good }]);
    assert.ok(problems.some((p) => /whole number/.test(p)));
    assert.ok(problems.some((p) => /used more than once/.test(p)));
});

test('catches missing text and bad dates', () => {
    const problems = validateNews([{ ...good, title: '', text: undefined, date: '10/20/2026' }]);
    assert.equal(problems.length, 3);
});

test('catches images that are missing or outside the news folder', () => {
    const imageExists = (name) => name === 'here.jpg';
    assert.deepEqual(validateNews([{ ...good, image: 'here.jpg' }], { imageExists }), []);
    assert.equal(validateNews([{ ...good, image: 'gone.jpg' }], { imageExists }).length, 1);
    assert.equal(validateNews([{ ...good, image: '../secret.jpg' }], { imageExists }).length, 1);
    assert.equal(validateNews([{ ...good, image: 'http://example.com/a.jpg' }]).length, 1);
    assert.deepEqual(validateNews([{ ...good, image: 'https://example.com/a.jpg' }]), []);
});

test('catches the same issue added twice', () => {
    const problems = validateNews([
        { ...good, sourceIssue: 5 },
        { ...good, id: 2, sourceIssue: 5 },
    ]);
    assert.ok(problems.some((p) => /#5 was added more than once/.test(p)));
});

test('reports a file that is not valid JSON', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'validate-'));
    const file = path.join(dir, 'news.json');
    await writeFile(file, '[{ "id": 1, }]');
    const problems = await run(file);
    assert.match(problems[0], /Couldn't read/);
});
