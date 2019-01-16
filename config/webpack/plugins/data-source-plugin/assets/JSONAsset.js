import Asset from './Asset';

export default class JSONAsset extends Asset {
    getContent() {
        return JSON.stringify(this.content, null, '  ');
    }
}
