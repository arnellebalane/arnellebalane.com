import '@babel/polyfill';
import path from 'path';
import {
    normalizeSortableValue,
    getFilesWithExtension,
    readFileContents,
    separateFrontMatterAndContent
} from './utils';
import config from '../../..';

function getAbsoluteUrl(url) {
    return path.join(config.BASE_URL, url);
}

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

function sortResourceEntries(resourceEntries, orderByKey) {
    if (!orderByKey) {
        return resourceEntries;
    }

    const isDescending = orderByKey.startsWith('-');
    const direction = isDescending ? 1 : -1;
    const key = isDescending ? orderByKey.substring(1) : orderByKey;

    return [...resourceEntries].sort((a, b) => {
        const _a = normalizeSortableValue(a[key]);
        const _b = normalizeSortableValue(b[key]);

        if (_a < _b) {
            return direction;
        } else if (_a > _b) {
            return -direction;
        }
        return 0;
    });
}

function paginateResourceEntries(resourceEntries, itemsPerPage) {
    return resourceEntries.reduce((pages, entry, i) => {
        const index = Math.floor(i / itemsPerPage);

        if (!pages[index]) {
            pages[index] = {
                page: index + 1,
                entries: []
            };
        }

        pages[index].entries.push(entry);

        return pages;
    }, []);
}

function evaluateResourcePipeline(resource, options) {
    resource = {
        ...resource,
        content: {
            data: resource.content
        },
        _finalize: content => JSON.stringify(content, null, '  '),
        _getSize: content => JSON.stringify(content, null, '  ').length
    };
    const resourceName = path.basename(resource.key, '.json');
    const resourceConfig = options.resourceConfigs[resourceName] || {};

    if (resourceConfig.orderBy) {
        resource.content.data = sortResourceEntries(resource.content.data, resourceConfig.orderBy);
    }

    let resources = [resource];

    if (resourceConfig.itemsPerPage) {
        const paginatedEntries = paginateResourceEntries(resource.content.data, resourceConfig.itemsPerPage);
        const totalPages = paginatedEntries.length;

        const getResourcePageUrls = page => ({
            nextPage: page < totalPages
                ? getAbsoluteUrl(getAssetKey(`${resourceName}/pages/${page + 1}.json`, options))
                : null,
            previousPage: page > 1
                ? getAbsoluteUrl(getAssetKey(`${resourceName}/pages/${page - 1}.json`, options))
                : null
        });

        const createResource = ({key, page, entries}) => ({
            key,
            content: {
                data: entries,
                ...getResourcePageUrls(page)
            },
            _finalize: resource._finalize,
            _getSize: resource._getSize
        });

        resources = paginatedEntries.reduce((results, {page, entries}) => {
            if (page === 1) {
                results = [...results, createResource({
                    page,
                    entries,
                    key: getAssetKey(`${resourceName}.json`, options)
                })];
            }

            results = [...results, createResource({
                page,
                entries,
                key: getAssetKey(`${resourceName}/pages/${page}.json`, options)
            })];

            return results;
        }, []);
    }

    return resources;
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

    const resourceAssets = evaluateResourcePipeline({
        key: getAssetKey(`${resourceName}.json`, options),
        content: resourceEntries.map(entry => entry.frontMatter)
    }, options);

    // TODO: Generate output assets for each entry.

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
            assets = [...assets, ...evaluateResourcePipeline({
                key: getAssetKey(resourceFile, options),
                content: require(getResourcePath(resourceFile, options))
            }, options)];
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
