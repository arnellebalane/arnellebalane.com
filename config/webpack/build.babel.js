import merge from 'webpack-merge';
import baseWebpackConfig, {resolvePath} from './base';

export default merge(baseWebpackConfig, {
    entry: '@/index.tsx',

    output: {
        path: resolvePath('build'),
        publicPath: '/',
        filename: '[name].[hash:6].js',
        chunkFilename: '[name].[hash:6].js'
    }
});
