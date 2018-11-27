import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import PwaManifestPlugin from 'webpack-pwa-manifest';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin';

import projectsData from './data/projects.json';
import articlesData from './data/articles.json';
import eventsData from './data/events.json';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.[hash].js'
    },

    mode: NODE_ENV,

    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(jpe?g|png|webp|woff2?)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]'
            }
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'source/index.html'),
            data: {
                projects: projectsData,
                articles: articlesData,
                events: eventsData
            },
            baseUrl: process.env.BASE_URL || 'https://arnellebalane.com',
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }
        }),

        new PreloadWebpackPlugin({
            include: 'initial'
        }),

        new MiniCssExtractPlugin({
            filename: 'index.[hash].css'
        }),

        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/
        }),

        /* eslint-disable camelcase */
        new PwaManifestPlugin({
            filename: '[name].[hash].[ext]',
            name: 'Arnelle Balane',
            short_name: 'arnelle',
            description: 'Arnelle\'s Personal Website',
            icons: [{
                src: path.resolve(__dirname, 'source/images/icon-512.png'),
                sizes: [16, 144, 192, 200, 512]
            }],
            theme_color: '#ffeb3b',
            background_color: '#ffffff',
            display: 'fullscreen',
            start_url: '/',
            scope: '/'
        }),
        /* eslint-enable camelcase */

        new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'sw.js',
            skipWaiting: true,
            clientsClaim: true
        }),

        new HtmlCriticalWebpackPlugin({
            base: 'build',
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            width: 375,
            height: 800
        })
    ]
};
