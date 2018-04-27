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
            template: path.resolve(__dirname, 'source/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ]
};
