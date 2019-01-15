import fs from 'fs';
import util from 'util';

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

export function normalizeJsonValue(value) {
    if (['true', 'false'].includes(value)) {
        return value === 'true';
    } else if (value === 'null') {
        return null;
    } else if (value === 'undefined') {
        return undefined;
    // eslint-disable-next-line unicorn/no-unsafe-regex
    } else if (/^(\d+(\.\d+)?)|(\.\d+)$/.test(value)) {
        return parseFloat(value, 10);
    }
    return value;
}

export async function getFilesWithExtension(directoryPath, extension) {
    const directoryItems = await readDir(directoryPath);
    return directoryItems.filter(item => item.endsWith(`.${extension}`));
}

export function readFileContents(filePath) {
    return readFile(filePath, 'utf8');
}

export function parseFrontMatter(input) {
    return input
        .split(/\r?\n+/g)
        .filter(line => !/^-+$/.test(line))
        .reduce((result, line) => {
            const index = line.indexOf(':');
            const key = line.substring(0, index).trim();
            const value = line.substring(index + 1).trim();
            result[key] = normalizeJsonValue(value);
            return result;
        }, {});
}

export function separateFrontMatterAndContent(input) {
    // eslint-disable-next-line unicorn/no-unsafe-regex
    const frontMatterRegex = /^(-+)(.+?)\1\s+(.+)$/s;
    const match = input.match(frontMatterRegex);

    if (match) {
        return {
            frontMatter: parseFrontMatter(match[2].trim()),
            content: match[3].trim()
        };
    }
    return null;
}
