const path = require('path');
const Webpack = require('webpack')
const { merge } = require('webpack-merge');
const common =require('./webpack.common')

module.exports = merge (common,{
    mode:'production',
    stats: 'errors-only',
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
    },
    plugins: [
        new Webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
      ],
})