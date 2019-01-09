import path from 'path';
import config from '../index';

const imagesRegex = /\.(png|jpe?g|gif|svg)$/;

export default {
    mode: config.NODE_ENV,

    module: {
        rules: [{
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
