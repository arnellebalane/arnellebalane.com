import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
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
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[name].[hash:6].css'
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
