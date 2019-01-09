import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './base.babel';

export default merge(baseConfig, {
    entry: '@/index.js',

    output: {
        path: path.resolve(__dirname, '../../build'),
        publicPath: '/',
        filename: '[name].[hash:6].js',
        chunkFilename: '[name].[hash:6].js'
    },

    plugins: [
        new HtmlWebpackPlugin()
    ]
});
