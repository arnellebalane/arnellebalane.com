import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DataSourcePlugin from './plugins/data-source-plugin';
import baseWebpackConfig, {resolvePath} from './base';
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
        }),

        new DataSourcePlugin({
            sourceDir: resolvePath('data'),
            namespace: 'api',
            resourceConfigs: {
                articles: {
                    sourceDir: resolvePath('data/articles'),
                    orderBy: '-date_published',
                    itemsPerPage: 1,
                    shouldInclude: item => item.published
                },
                events: {
                    orderBy: '-date',
                    itemsPerPage: 1
                }
            }
        })
    ]
});
