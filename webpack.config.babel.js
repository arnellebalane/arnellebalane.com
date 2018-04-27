import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.bundle.js'
    },
    mode: NODE_ENV,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'source/index.html')
        })
    ]
};
