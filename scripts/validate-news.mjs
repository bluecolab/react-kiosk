#!/usr/bin/env node
/**
 * Checks that assets/images/news/news.json is something the kiosk can show.
 * The rules match what Dock.tsx expects (numeric id; text title, date and body),
 * plus checks that catch mistakes before they reach the kiosk.
 *
 * Usage: node scripts/validate-news.mjs [path/to/news.json]
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const DEFAULT_NEWS_FILE = 'assets/images/news/news.json';

function isRealDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [y, m, d] = value.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

const isText = (value) => typeof value === 'string' && value.trim() !== '';

/**
 * Returns a list of problems (empty when everything is fine).
 * imageExists(fileName) says whether an image file is next to news.json.
 */
export function validateNews(news, { imageExists = () => true } = {}) {
    if (!Array.isArray(news)) return ['news.json must contain a list ([ ... ]).'];

    const problems = [];
    const ids = new Set();
    const issues = new Set();

    news.forEach((item, index) => {
        const where = `Entry ${index + 1}${item && item.id !== undefined ? ` (id ${item.id})` : ''}`;
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
            problems.push(`${where} is not an object.`);
            return;
        }

        if (!Number.isInteger(item.id)) {
            problems.push(`${where}: "id" must be a whole number, or the kiosk will hide it.`);
        } else if (ids.has(item.id)) {
            problems.push(`${where}: "id" ${item.id} is used more than once.`);
        } else {
            ids.add(item.id);
        }

        for (const key of ['title', 'text']) {
            if (!isText(item[key])) problems.push(`${where}: "${key}" is missing or empty.`);
        }
        if (!isRealDate(item.date)) {
            problems.push(`${where}: "date" must be a real date written as YYYY-MM-DD.`);
        }
        if (item.author !== undefined && !isText(item.author)) {
            problems.push(`${where}: "author" must be text when it's included.`);
        }
        if (item.link !== undefined && !/^https?:\/\/\S+$/.test(item.link)) {
            problems.push(`${where}: "link" must start with http:// or https://.`);
        }

        if (item.image !== undefined) {
            if (typeof item.image !== 'string' || item.image === '') {
                problems.push(`${where}: "image" must be a file name or an https:// address.`);
            } else if (/^https?:\/\//.test(item.image)) {
                if (!item.image.startsWith('https://')) {
                    problems.push(`${where}: "image" web addresses must use https://.`);
                }
            } else if (/[\\/]/.test(item.image) || item.image.startsWith('.')) {
                problems.push(`${where}: "image" must be a plain file name in the news folder.`);
            } else if (!imageExists(item.image)) {
                problems.push(`${where}: image file "${item.image}" is not in the news folder.`);
            }
        }

        if (item.sourceIssue !== undefined) {
            if (!Number.isInteger(item.sourceIssue)) {
                problems.push(`${where}: "sourceIssue" must be an issue number.`);
            } else if (issues.has(item.sourceIssue)) {
                problems.push(`${where}: issue #${item.sourceIssue} was added more than once.`);
            } else {
                issues.add(item.sourceIssue);
            }
        }
    });

    return problems;
}

export async function run(newsFile = DEFAULT_NEWS_FILE) {
    let news;
    try {
        news = JSON.parse(await readFile(newsFile, 'utf8'));
    } catch (error) {
        return [`Couldn't read ${newsFile} as JSON: ${error.message}`];
    }
    const dir = path.dirname(newsFile);
    return validateNews(news, { imageExists: (name) => existsSync(path.join(dir, name)) });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const newsFile = process.argv[2] || DEFAULT_NEWS_FILE;
    const problems = await run(newsFile);
    if (problems.length > 0) {
        console.error(`${newsFile} has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
        process.exit(1);
    }
    console.log(`${newsFile} is valid.`);
}
