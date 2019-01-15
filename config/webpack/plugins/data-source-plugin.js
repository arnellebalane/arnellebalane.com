import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

function orderDataSourceBy(data, orderKey, isDescending) {
    const normalize = value => {
        const date = new Date(value);
        if (!Number.isNaN(date.valueOf())) {
            return date;
        } else if (typeof value === 'string' && /^\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        return value;
    };

    return [...data].sort((a, b) => {
        const _a = normalize(a[orderKey]);
        const _b = normalize(b[orderKey]);
        return (_a - _b) * (isDescending ? -1 : 1);
    });
}

async function processDataSource(filename, options) {
    const key = path.join(options.namespace, filename);
    const basename = path.basename(filename, '.json');
    let content = require(path.join(options.sourceDir, filename));

    if (!(basename in options.dataSourceConfigs)) {
        return [{key, content}];
    }

    const {sourceDir, orderBy} = options.dataSourceConfigs[basename];

    if (sourceDir) {
        const sourceDirFiles = await readDir(sourceDir);
        const sourceFiles = await Promise.all(sourceDirFiles
            .filter(sourceName => sourceName.endsWith('.md'))
            .map(async sourceName => ({
                filename: sourceName,
                content: (await readFile(path.join(sourceDir, sourceName))).toString('ascii')
            })));
        content = sourceFiles.map(sourceFile => sourceFile.content
            // eslint-disable-next-line unicorn/no-unsafe-regex
            .match(/^---.+?---(\r?\n)+/s)[0].trim().split(/\r?\n/)
            .reduce((result, row) => {
                if (row !== '---') {
                    const [property, value] = row.split(/:\s+/, 2);
                    result[property] = value;
                }
                return result;
            }, {}));
    }

    if (orderBy) {
        const isDescending = orderBy.startsWith('-');
        const orderKey = isDescending ? orderBy.substring(1) : orderBy;
        content = orderDataSourceBy(content, orderKey, isDescending);
    }

    return [{key, content}];
}

async function getDataSources(options) {
    const sourceDirFiles = await readDir(options.sourceDir);

    const dataSources = await Promise.all(sourceDirFiles
        .filter(filename => filename.endsWith('.json'))
        .map(filename => processDataSource(filename, options)));

    return [].concat(...dataSources);
}

export default class DataSourcePlugin {
    constructor(options={}) {
        this.options = {
            ...options,
            namespace: options.namespace || path.basename(options.sourceDir)
        };
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise('DataSourcePlugin', async compilation => {
            const dataSources = await getDataSources(this.options);

            dataSources.forEach(({key, content}) => {
                content = JSON.stringify(content);
                compilation.assets[key] = {
                    source: () => content,
                    size: () => content.length
                };
            });
        });
    }
}
