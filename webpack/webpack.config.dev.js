const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        historyApiFallback: true
      },
    plugins: [
        new Webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.DOMAIN': JSON.stringify(''),
        }),
      ],
})