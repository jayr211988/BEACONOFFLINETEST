const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');

module.exports = () => {

    const app = express();

    config.plugins = [
        new webpack.DefinePlugin({
            'process.dev': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ];

    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    config.plugins.push(new webpack.NoEmitOnErrorsPlugin());

    config.entry = ['webpack-hot-middleware/client',config.entry];

    const compiler = webpack(config);

    const statsConf = {
        colors:true,
        hash:false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    };

    app.use(
        webpackMiddleware(compiler,{
            publicPath: config.output.publicPath,
            contentBase: 'app',
            stats: statsConf,
        })
    );

    app.use(webpackHotMiddleware(compiler));

    app.use(express.static(__dirname));

    app.get('*',(req,res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.listen(3000,err =>{
        if(err) {
            console.log(err);
        }
    });
}