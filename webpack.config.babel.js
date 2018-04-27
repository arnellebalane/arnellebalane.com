import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.bundle.js'
    },
    mode: NODE_ENV
};
