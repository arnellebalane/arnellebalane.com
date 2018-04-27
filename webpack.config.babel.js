import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PwaManifestPlugin from 'webpack-pwa-manifest';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.[hash:6].js'
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
                name: '[name].[hash:6].[ext]'
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
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[hash:6].css'
        }),
        new PwaManifestPlugin({
            filename: '[name].[hash:6].[ext]',
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
        })
    ]
};
