import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, 'source/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'index.bundle.js'
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
                name: '[name].[ext]'
            }
        } ]
    },
    plugins: [
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
            filename: 'index.css'
        })
    ]
};
