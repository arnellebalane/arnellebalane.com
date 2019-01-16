import Asset from './Asset';

export default class MarkdownAsset extends Asset {
    getContent() {
        return JSON.stringify(this.content, null, '  ');
    }
}
