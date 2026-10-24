#!/usr/bin/env node
/**
 * Turns a "News Item Creation" issue into an entry in assets/images/news/news.json.
 *
 * The issue form (.github/ISSUE_TEMPLATE/news_item.yml) renders each answer under a
 * "### <label>" heading, so this script reads the answers by those headings.
 * If you rename a label in the form, update HEADINGS below to match.
 *
 * Inputs (environment variables, as a GitHub Actions workflow would pass them):
 *   ISSUE_BODY    the issue's Markdown body (required unless --body-file is given)
 *   ISSUE_NUMBER  the issue number, stored as sourceIssue to stop duplicates
 *   ISSUE_DATE    the issue's created_at timestamp, used if the form's date is blank
 *
 * Options:
 *   --body-file <path>  read the issue body from a file instead of ISSUE_BODY
 *   --news-file <path>  news.json to update (default: assets/images/news/news.json)
 *   --no-download       store the image's web address instead of downloading it
 *   --dry-run           print the new entry without changing any files
 *
 * Local test run:
 *   node scripts/create-news-item.mjs --body-file sample-issue.md --dry-run
 */
import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const DEFAULT_NEWS_FILE = 'assets/images/news/news.json';

/** Labels from news_item.yml. Keep these in sync with the form. */
export const HEADINGS = {
    title: 'What is the title?',
    author: 'Who is the author?',
    date: 'What is the date of the news?',
    text: 'What are the details?',
    link: 'Link to the full story',
    image: 'Upload image',
};

/** What GitHub writes under a heading when an optional field is left empty. */
const NO_RESPONSE = '_No response_';

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // GitHub's own limit for image uploads

const IMAGE_TYPES = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif',
};

/** Splits the issue body into { heading: answer } using its "### " headings. */
export function parseSections(body) {
    const sections = {};
    const text = String(body ?? '').replace(/\r\n?/g, '\n');
    const parts = text.split(/^###[ \t]+(.+?)[ \t]*$/m);
    // parts = [before first heading, heading1, answer1, heading2, answer2, ...]
    for (let i = 1; i < parts.length; i += 2) {
        const answer = parts[i + 1].trim();
        sections[parts[i].trim()] = answer === NO_RESPONSE ? '' : answer;
    }
    return sections;
}

/** Finds the first uploaded file's web address in the "Upload image" answer. */
export function findImageUrl(answer) {
    if (!answer) return null;
    const patterns = [
        /<img\b[^>]*\bsrc=["'](https:\/\/[^"']+)["']/i, // <img src="...">
        /!\[[^\]]*\]\((https:\/\/[^)\s]+)\)/, // ![alt](...)
        /\[[^\]]*\]\((https:\/\/[^)\s]+)\)/, // [name](...)
        /(https:\/\/\S+)/, // bare link
    ];
    for (const pattern of patterns) {
        const match = answer.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function isRealDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/**
 * Reads and checks the form answers. Throws one error listing every problem,
 * so whoever filed the issue can fix them all at once.
 */
export function parseIssue(body, { issueDate } = {}) {
    const sections = parseSections(body);
    const get = (key) => sections[HEADINGS[key]] ?? '';
    const problems = [];

    const title = get('title');
    const author = get('author');
    const text = get('text');
    if (!title) problems.push(`"${HEADINGS.title}" is empty.`);
    if (!author) problems.push(`"${HEADINGS.author}" is empty.`);
    if (!text) problems.push(`"${HEADINGS.text}" is empty.`);

    let date = get('date');
    if (!date && issueDate) date = String(issueDate).slice(0, 10);
    if (!date) {
        problems.push(`"${HEADINGS.date}" is empty.`);
    } else if (!isRealDate(date)) {
        problems.push(
            `"${HEADINGS.date}" must be a real date written as YYYY-MM-DD, not "${date}".`
        );
    }

    const link = get('link');
    if (link && !/^https?:\/\/\S+$/.test(link)) {
        problems.push(
            `"${HEADINGS.link}" must be a web address starting with http:// or https://.`
        );
    }

    const imageAnswer = get('image');
    const imageUrl = findImageUrl(imageAnswer);
    if (imageAnswer && !imageUrl) {
        problems.push(`"${HEADINGS.image}" has something in it, but no uploaded file was found.`);
    }

    if (problems.length > 0) {
        throw new Error(`This news request can't be added yet:\n- ${problems.join('\n- ')}`);
    }

    return {
        title: title.replace(/\s+/g, ' '),
        author: author.replace(/\s+/g, ' '),
        date,
        text,
        link: link || undefined,
        imageUrl: imageUrl || undefined,
    };
}

/** Next id: one more than the highest number already used. The kiosk needs numeric ids. */
export function nextId(news) {
    const ids = news.map((item) => item.id).filter((id) => Number.isInteger(id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

/**
 * Returns a new array with the entry added, newest first.
 * Throws if this issue was already added.
 */
export function assertCanAdd(news, issueNumber) {
    if (!Array.isArray(news)) throw new Error('news.json must contain a list ([ ... ]).');
    const sourceIssue = issueNumber ? Number(issueNumber) : undefined;
    if (sourceIssue && news.some((item) => Number(item.sourceIssue) === sourceIssue)) {
        throw new Error(`Issue #${sourceIssue} has already been added to news.json.`);
    }
    return sourceIssue;
}

export function addNewsItem(news, fields, { issueNumber, image } = {}) {
    const sourceIssue = assertCanAdd(news, issueNumber);

    // Same key order as the existing entries in news.json.
    const entry = { id: nextId(news), title: fields.title, date: fields.date };
    if (image) entry.image = image;
    entry.text = fields.text;
    entry.author = fields.author;
    if (fields.link) entry.link = fields.link;
    if (sourceIssue) entry.sourceIssue = sourceIssue;

    // New entry first, then a stable sort, so it leads any posts with the same date.
    const updated = [entry, ...news].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return { entry, news: updated };
}

/** Downloads the uploaded image next to news.json and returns its file name. */
export async function downloadImage(url, { dir, baseName, fetchImpl = fetch }) {
    const response = await fetchImpl(url, { redirect: 'follow' });
    if (!response.ok) {
        throw new Error(`Couldn't download the image (HTTP ${response.status}): ${url}`);
    }
    const type = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const extension = IMAGE_TYPES[type];
    if (!extension) {
        throw new Error(
            `The upload isn't a PNG, JPG, WebP or GIF image (got "${type || 'unknown'}"): ${url}`
        );
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > MAX_IMAGE_BYTES) throw new Error('The image is larger than 10 MB.');

    const fileName = `${baseName}${extension}`;
    await writeFile(path.join(dir, fileName), bytes);
    return fileName;
}

/** Writes JSON through a temporary file, so a failed write can't leave news.json half-written. */
async function writeJsonSafely(filePath, data) {
    const temporaryPath = `${filePath}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, filePath);
}

function parseArgs(argv) {
    const options = { newsFile: DEFAULT_NEWS_FILE, download: true, dryRun: false };
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--body-file') options.bodyFile = argv[++i];
        else if (arg === '--news-file') options.newsFile = argv[++i];
        else if (arg === '--no-download') options.download = false;
        else if (arg === '--dry-run') options.dryRun = true;
        else throw new Error(`Unknown option: ${arg}`);
    }
    return options;
}

export async function run({
    argv = [],
    env = process.env,
    fetchImpl = fetch,
    log = console.log,
} = {}) {
    const options = parseArgs(argv);
    const body = options.bodyFile ? await readFile(options.bodyFile, 'utf8') : env.ISSUE_BODY;
    if (!body) throw new Error('No issue body: set ISSUE_BODY or pass --body-file <path>.');

    const fields = parseIssue(body, { issueDate: env.ISSUE_DATE });
    const news = JSON.parse(await readFile(options.newsFile, 'utf8'));
    assertCanAdd(news, env.ISSUE_NUMBER); // before downloading anything
    const id = nextId(news);

    let image;
    if (fields.imageUrl) {
        if (!options.download || options.dryRun) {
            image = fields.imageUrl;
        } else {
            image = await downloadImage(fields.imageUrl, {
                dir: path.dirname(options.newsFile),
                baseName: `news-${id}`,
                fetchImpl,
            });
        }
    }

    const result = addNewsItem(news, fields, { issueNumber: env.ISSUE_NUMBER, image });

    if (options.dryRun) {
        log('Dry run: news.json was not changed. The new entry would be:');
    } else {
        await writeJsonSafely(options.newsFile, result.news);
        log(`Added news item #${result.entry.id} to ${options.newsFile}:`);
    }
    log(JSON.stringify(result.entry, null, 2));
    return result;
}

// Run only when called directly (node scripts/create-news-item.mjs), not when imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    run({ argv: process.argv.slice(2) }).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}
