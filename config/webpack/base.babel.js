import path from 'path';
import config from '../index';

const javascriptRegex = /\.(js|ts|jsx|tsx)$/;
const stylesheetRegex = /\.(css)$/;
const imagesRegex = /\.(png|jpe?g|gif|svg)$/;

export default {
    mode: config.NODE_ENV,

    module: {
        rules: [{
            test: javascriptRegex,
            loader: 'babel-loader'
        }, {
            test: stylesheetRegex,
            use: ['style-loader', 'css-loader']
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
    }
};
