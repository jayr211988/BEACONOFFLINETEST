var webpack = require('webpack');
var path = require('path');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var ExctractTextPlugin =require('extract-text-webpack-plugin');

var extractPlugin = new ExctractTextPlugin({
    filename: 'main.css'
});

module.exports = {
    devServer: {
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'app'),
    entry: path.join(__dirname, 'app','index.js'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['es2015','react', 'stage-0'],
                    plugins: ['transform-runtime', 'lodash','transform-decorators-legacy'],
                    env: {
                        development: {
                            presets: ['react-hmre'],
                        },
                        production: {
                            presets: ['react-optimize'],
                        },
                    },
                },
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('dev'),
                __API_BEACON__: JSON.stringify('http://beacon2-dev.azurewebsites.net/'),
                __API_ECLAIMS__: JSON.stringify('http://121.58.245.235:7070/'),
                __API_QMEUP__: JSON.stringify('https://qmuapi-dev.azurewebsites.net/'),

                __QMU_FACILITY_ : JSON.stringify('http://qmu-facility-dev.au.meteorapp.com/'),
                __APP_VERSION__: JSON.stringify('1.0.6.0'),
                __APP_INLINEMANUAL__: JSON.stringify('https://inlinemanual.com/embed/player.1fa0441fb431abd366d37d60db7ca478.js')
            }),
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'public/cached_uglify'),
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        }),
    ]
}