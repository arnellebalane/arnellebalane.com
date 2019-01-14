import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseWebpackConfig, {resolvePath} from './base.babel';
import config from '..';

export default merge(baseWebpackConfig, {
    entry: '@/index.tsx',

    output: {
        path: resolvePath('build'),
        publicPath: '/',
        filename: '[name].[hash:6].js',
        chunkFilename: '[name].[hash:6].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: resolvePath('source/index.html'),
            templateParameters: {
                baseUrl: config.BASE_URL
            },
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            }
        })
    ]
});
