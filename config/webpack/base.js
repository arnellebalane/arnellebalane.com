import path from 'path';
import {DefinePlugin} from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import DataSourcePlugin from './plugins/data-source-plugin';
import config from '..';

const typescriptRegex = /\.tsx?$/;
const javascriptRegex = /\.jsx?$/;
const stylesheetRegex = /\.(css)$/;
const imagesRegex = /\.(png|jpe?g|gif|svg)$/;

export function resolvePath(relativePath) {
    return path.resolve(__dirname, `../../${relativePath}`);
}

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
                loader: config.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader'
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
            '@': resolvePath('source')
        }
    },

    plugins: [
        new DefinePlugin({
            'process.env': {
                API_ENDPOINT: JSON.stringify(config.API_ENDPOINT),
                API_PAGE_FORMAT: JSON.stringify(config.API_PAGE_FORMAT),
                API_PATH_EXTENSION: JSON.stringify(config.API_PATH_EXTENSION)
            }
        }),

        new HtmlWebpackPlugin({
            template: resolvePath('source/index.html'),
            templateParameters: {
                baseUrl: config.BASE_URL
            },
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[name].[hash:6].css'
        }),

        new DataSourcePlugin({
            sourceDir: resolvePath('data'),
            namespace: 'api',
            resourceConfigs: {
                articles: {
                    sourceDir: resolvePath('data/articles'),
                    orderBy: '-date_published',
                    itemsPerPage: 1,
                    shouldInclude: item => item.published
                },
                events: {
                    orderBy: '-date',
                    itemsPerPage: 1
                }
            }
        })
    ],

    /*
     *  https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
     *  Using TerserPlugin instead of UglifyJsPlugin because the former can
     *  minify ES2015+ code.
     */
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),

            new OptimizeCssAssetsPlugin()
        ]
    }
};
