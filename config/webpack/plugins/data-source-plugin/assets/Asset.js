import path from 'path';

export default class Asset {
    constructor(filePath, content, resource) {
        this.inputAbsolutePath = filePath;
        this.inputRelativePath = filePath
            .replace(resource.baseUrl, '')
            .replace(/^\//, '');
        this.outputKey = path.join(resource.outputBaseUrl, this.inputRelativePath);

        this.resource = resource;
        this.content = content;
    }

    async apply() {
        // Do nothing by default. Needs to be overriden by child classes.
    }

    getContent() {
        return this.content;
    }

    getContentLength() {
        return this.getContent().length;
    }
}
