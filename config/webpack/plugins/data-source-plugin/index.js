import '@babel/polyfill';
import path from 'path';
import {getFilesWithExtension} from './utils';
import Resource from './Resource';
import config from '../../..';

export default class DataSourcePlugin {
    constructor(options={}) {
        this.options = {
            ...options,
            namespace: options.namespace || path.basename(options.sourceDir)
        };

        this.baseUrl = this.options.sourceDir;
        this.absoluteBaseUrl = [config.BASE_URL, this.options.namespace].join('/');
        this.outputRelativePath = this.options.namespace;

        this.assets = new Map();
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise('DataSourcePlugin', async compilation => {
            await this.getDataSourceAssets();

            this.assets.forEach((asset, key) => {
                compilation.assets[key] = {
                    source: () => asset.getContent(),
                    size: () => asset.getContentLength()
                };
            });
        });
    }

    async getDataSourceAssets() {
        const resourceFiles = await getFilesWithExtension(this.options.sourceDir, 'json');

        await Promise.all(resourceFiles.map(async resourceFile => {
            const resourceName = path.basename(resourceFile, '.json');
            const resourceConfig = this.options.resourceConfigs[resourceName] || {};
            const resourcePath = path.join(this.options.sourceDir, resourceFile);

            const resource = new Resource(resourcePath, resourceConfig, this);
            await resource.apply();

            this.addAssets(resource.assets);
        }));
    }

    addAssets(assets) {
        assets.forEach((asset, key) => this.assets.set(key, asset));
    }

    getAbsoluteUrl(relativeAssetPath) {
        return [this.absoluteBaseUrl, relativeAssetPath].join('/');
    }
}
