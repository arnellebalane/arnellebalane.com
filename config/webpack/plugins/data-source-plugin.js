import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readDir = util.promisify(fs.readdir);

export default class DataSourcePlugin {
    constructor(options={}) {
        this.options = {
            ...options,
            namespace: options.namespace || path.basename(options.sourceDir)
        };
    }

    async apply(compiler) {
        const sourceDirFiles = await readDir(this.options.sourceDir);
        const dataSources = sourceDirFiles.reduce((sources, filename) => {
            if (filename.endsWith('.json')) {
                const source = path.basename(filename, '.json');
                const sourcePath = path.join(this.options.sourceDir, filename);
                sources[source] = require(sourcePath);
            }
            return sources;
        }, {});

        compiler.hooks.emit.tap('DataSourcePlugin', compilation => {
            Object.entries(dataSources).forEach(([key, value]) => {
                const filename = `${this.options.namespace}/${key}.json`;
                const contents = JSON.stringify(value);

                compilation.assets[filename] = {
                    source: () => contents,
                    size: () => contents.length
                };
            });
        });
    }
}
