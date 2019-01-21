import Asset from './Asset';

export default class MarkdownAsset extends Asset {
    constructor(...args) {
        super(...args);

        this.inputRelativePath = this.inputRelativePath.replace(/\.md$/, '');
        this.outputKey = this.outputKey.replace(/\.md$/, '.json');
    }

    getContent() {
        return JSON.stringify(this.content, null, '  ');
    }
}
