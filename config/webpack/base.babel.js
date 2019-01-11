import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '..';

const typescriptRegex = /\.tsx?$/;
const javascriptRegex = /\.jsx?$/;
const stylesheetRegex = /\.(css)$/;
const imagesRegex = /\.(png|jpe?g|gif|svg)$/;

export default {
    mode: config.NODE_ENV,

    module: {
        rules: [{
            test: typescriptRegex,
            loader: 'ts-loader'
        }, {
            test: javascriptRegex,
            loader: 'babel-loader'
        }, {
            test: stylesheetRegex,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }]
        }, {
            test: imagesRegex,
            loader: 'file-loader',
            options: {
                name: '[name].[hash:6].[ext]'
            }
        }]
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../../source')
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[name].[hash:6].css'
        })
    ]
};
