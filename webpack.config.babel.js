import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import PwaManifestPlugin from 'webpack-pwa-manifest';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProdEnv = NODE_ENV === 'production';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.[hash].js'
    },

    mode: NODE_ENV,

    module: {
        rules: [ {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(png|webp|woff2?)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]'
            }
        } ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'source/index.html'),
            data: {
                projects: require('./data/projects.json'),
                articles: require('./data/articles.json'),
                events: require('./data/events.json')
            },
            baseUrl: process.env.BASE_URL || 'https://arnellebalane.com',
            minify: {
                collapseBooleanAttributes: isProdEnv,
                collapseWhitespace: isProdEnv,
                minifyCSS: isProdEnv
            },
            chunks: []
        }),

        new PreloadWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'index.[hash].css'
        }),

        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/
        }),

        new PwaManifestPlugin({
            filename: '[name].[hash][ext]',
            name: 'Arnelle Balane',
            short_name: 'arnelle',
            description: 'Arnelle\'s Personal Website',
            icons: [ {
                src: path.resolve(__dirname, 'source/images/icon-512.png'),
                sizes: [16, 144, 192, 200, 512]
            } ],
            theme_color: '#ffeb3b',
            background_color: '#ffffff',
            display: 'fullscreen',
            start_url: '/',
            scope: '/'
        }),

        new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'sw.js',
            skipWaiting: true,
            clientsClaim: true
        })
    ]
};
