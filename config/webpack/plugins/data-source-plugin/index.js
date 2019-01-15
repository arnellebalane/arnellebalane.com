import '@babel/polyfill';
import path from 'path';
import {
    getFilesWithExtension,
    readFileContents,
    separateFrontMatterAndContent
} from './utils';

function getResourcePath(resource, options) {
    return path.join(options.sourceDir, resource);
}

function getAssetKey(asset, options) {
    return path.join(options.namespace, asset);
}

function finalizeDataSourceAsset(asset) {
    const content = typeof asset._finalize === 'function'
        ? asset._finalize(asset.content)
        : asset.content;
    const size = typeof asset._getSize === 'function'
        ? asset._getSize(asset.content)
        : content.length;

    return {
        content,
        size,
        key: asset.key
    };
}

async function getDataSourceAssetsForResource(resourceName, options) {
    const resourceConfig = options.resourceConfigs[resourceName];
    const resourceEntryFiles = await getFilesWithExtension(resourceConfig.sourceDir, 'md');

    const relativeSourceDir = resourceConfig.sourceDir.replace(options.sourceDir, '');

    /* eslint-disable function-paren-newline */
    const resourceEntries = (await Promise.all(
        resourceEntryFiles.map(async entryFile => {
            const entryPath = path.join(resourceConfig.sourceDir, entryFile);
            const entryContents = await readFileContents(entryPath);
            const {frontMatter, content} = separateFrontMatterAndContent(entryContents) || {};

            return {
                content,
                frontMatter,
                key: getAssetKey(path.join(relativeSourceDir, entryFile), options),
                path: entryPath
            };
        })
    )).filter(({frontMatter}) => {
        if (!frontMatter) {
            return false;
        } else if (typeof resourceConfig.shouldInclude === 'function') {
            return resourceConfig.shouldInclude(frontMatter);
        }
        return true;
    });
    /* eslint-enable function-paren-newline */

    const resourceAssets = [{
        key: getAssetKey(`${resourceName}.json`, options),
        content: resourceEntries,
        _finalize: content => JSON.stringify(content, null, '  '),
        _getSize: content => JSON.stringify(content, null, '  ').length
    }];

    return resourceAssets;
}

async function getDataSourceAssets(options) {
    const resourceFiles = await getFilesWithExtension(options.sourceDir, 'json');
    let assets = [];

    for (let i = 0; i < resourceFiles.length; i++) {
        const resourceFile = resourceFiles[i];
        const resourceName = path.basename(resourceFile, '.json');

        if (resourceName in options.resourceConfigs
        && options.resourceConfigs[resourceName].sourceDir) {
            assets = [
                ...assets,
                ...(await getDataSourceAssetsForResource(resourceName, options))
            ];
        } else {
            const resourcePath = getResourcePath(resourceFile, options);
            assets = [...assets, {
                key: getAssetKey(resourceFile, options),
                content: require(resourcePath),
                _finalize: content => JSON.stringify(content, null, '  '),
                _getSize: content => JSON.stringify(content, null, '  ').length
            }];
        }
    }

    return assets.map(finalizeDataSourceAsset);
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
            const dataSources = await getDataSourceAssets(this.options);

            dataSources.forEach(({key, content, size}) => {
                compilation.assets[key] = {
                    source: () => content,
                    size: () => size
                };
            });
        });
    }
}
