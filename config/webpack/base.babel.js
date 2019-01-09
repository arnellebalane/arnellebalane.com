import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

const imagesRegex = /\.(png|jpe?g|gif|svg)$/;

export default {
    mode: NODE_ENV,

    module: {
        rules: [{
            test: imagesRegex,
            loader: 'file-loader'
        }]
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../../source')
        }
    }
};
