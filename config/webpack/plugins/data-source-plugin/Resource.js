/* eslint camelcase: ['error', {allow: ['next_page', 'previous_page', 'full_url']}] */

import path from 'path';
import {
    sortObjectsByKey,
    paginate,
    getFilesWithExtension,
    readFileContents,
    separateFrontMatterAndContent
} from './utils';
import JSONAsset from './assets/JSONAsset';
import MarkdownAsset from './assets/MarkdownAsset';
import config from '../../..';

export default class Resource {
    constructor(resourcePath, options, plugin) {
        this.name = path.basename(resourcePath, '.json');
        this.baseUrl = plugin.baseUrl;
        this.outputBaseUrl = plugin.outputRelativePath;
        this.inputAbsolutePath = resourcePath;

        this.options = options;
        this.plugin = plugin;
        this.assets = new Map();
    }

    async apply() {
        let contents = this.options.sourceDir
            ? await this.constructResourceContents()
            : require(this.inputAbsolutePath);

        const {orderBy, itemsPerPage} = this.options;

        if (orderBy) {
            contents = sortObjectsByKey(contents, orderBy);
        }

        if (itemsPerPage) {
            const formatPage = page => config.API_PAGE_FORMAT.replace('{page}', page);
            const getAssetPath = page => path.join(this.name, 'pages', `${page}.json`);
            /* eslint-disable function-paren-newline */
            const getPageUrl = page => this.plugin.getAbsoluteUrl(
                path.join(this.outputBaseUrl, this.name)
            ) + formatPage(page);
            /* eslint-enable function-paren-newline */

            paginate(contents, itemsPerPage).forEach((entries, i, arr) => {
                const totalPages = arr.length;
                const page = i + 1;
                const assetPath = getAssetPath(page);

                const content = {
                    data: entries,
                    next_page: page < totalPages ? getPageUrl(page + 1) : null,
                    previous_page: page > 1 ? getPageUrl(page - 1) : null
                };

                if (page === 1) {
                    this.addAsset(new JSONAsset(this.inputAbsolutePath, content, this));
                }
                this.addAsset(new JSONAsset(assetPath, content, this));
            });
        } else {
            this.addAsset(new JSONAsset(this.inputAbsolutePath, {data: contents}, this));
        }
    }

    async constructResourceContents() {
        const entryFiles = await getFilesWithExtension(this.options.sourceDir, 'md');
        const shouldInclude = this.options.shouldInclude || (() => true);

        return Promise.all(entryFiles.map(async entry => {
            const entryPath = path.join(this.options.sourceDir, entry);
            const entryContent = await readFileContents(entryPath);

            const extracted = separateFrontMatterAndContent(entryContent);
            if (!extracted || !shouldInclude(extracted.frontMatter)) {
                return null;
            }

            const asset = this.addAsset(new MarkdownAsset(entryPath, {
                data: {
                    ...extracted.frontMatter,
                    content: extracted.content
                }
            }, this));

            return {
                ...extracted.frontMatter,
                url: this.plugin.getAbsoluteUrl(asset.inputRelativePath),
                slug: asset.inputRelativePath.split('/').pop()
            };
        })).then(entries => entries.filter(Boolean));
    }

    addAsset(asset) {
        this.assets.set(asset.outputKey, asset);
        return asset;
    }
}
