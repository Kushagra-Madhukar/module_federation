const {merge} = require('webpack-merge');

const devConfig = require('./webpack.dev');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, devConfig);