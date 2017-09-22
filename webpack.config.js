'use strict';
var productionEnv = 'development';
//var productionEnv = 'production';
var debug = productionEnv !== 'production';
var webpack = require('webpack');
var path = require('path');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/client/app'),
    devtool: debug ? 'inline-sourcemap' : false,
    entry: './js/bundle.js',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
                query: {
                	presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-decorators-legacy'
                    ],
                },
        },
        {test: /\.html$/, loader: 'file-loader?name=[name].[ext]'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
        {test: /\.json$/, loader: 'json-loader'}
    ]
    },
    output: {
        path: path.join(__dirname, '/client/app/js'),
        publicPath: '/',
    	filename: 'bundle.min.js'
    },
    plugins: debug ? [] : [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
