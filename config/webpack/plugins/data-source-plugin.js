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

    apply() {
        // TODO: Implement this plugin!
    }

    async getDataSources() {
        const sourceDirFiles = await readDir(this.options.sourceDir);

        return sourceDirFiles.reduce((sources, filename) => {
            if (filename.endsWith('.json')) {
                const source = path.basename(filename, '.json');
                const sourcePath = path.join(this.options.sourceDir, filename);
                sources[source] = require(sourcePath);
            }
            return sources;
        }, {});
    }
}
