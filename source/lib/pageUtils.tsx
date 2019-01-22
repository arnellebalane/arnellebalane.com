const pageFormat = process.env.API_PAGE_FORMAT;
const pageFormatRegex = new RegExp(pageFormat
    .replace('{page}', '(\\d+)')
    .replace('?', '\\?'));

export function extractPage(url) {
    const match = url.match(pageFormatRegex);
    return match ? parseInt(match[1], 10) : 1;
}

export function constructPage(page) {
    return pageFormat.replace('{page}', page);
}
