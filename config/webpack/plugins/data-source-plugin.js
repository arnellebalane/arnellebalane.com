import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readDir = util.promisify(fs.readdir);

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

function processDataSource(filename, options) {
    const key = path.join(options.namespace, filename);
    const basename = path.basename(filename, '.json');
    let content = require(path.join(options.sourceDir, filename));

    if (!(basename in options.dataSourceConfigs)) {
        return [{key, content}];
    }

    const {orderBy} = options.dataSourceConfigs[basename];

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
        compiler.hooks.emit.tapPromise('DataSourcePlugin', () => {
            const dataSources = getDataSources(this.options);
            console.log(util.inspect(dataSources, {
                depth: Infinity
            }));
        });
    }
}
