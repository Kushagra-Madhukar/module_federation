const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DotEnv = require('dotenv-webpack');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8083/'
    },
    devServer: {
        port: 8083,
        hot: true,
        open: false,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{loader: MiniCssExtractPlugin.loader, options: {publicPath: "", esModule: false}}, {loader: 'css-loader', options: {sourceMap: true}}]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: "", esModule: false}},
                    {loader: "css-loader", options: {importLoaders: 1, sourceMap: true, url: false}},
                    {loader: "sass-loader", options: {sassOptions: {outputStyle: 'expanded'}, sourceMap: true}}
                ]
            }
        ]
    },
    plugins: [
        new DotEnv({
            path: './.env'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.REACT_APP_PIXABAY_API_KEY': JSON.stringify(process.env.REACT_APP_PIXABAY_API_KEY),
            __CLIENT__: true,
            __SERVER__: false
        }),
        new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            experimentalUseImportModule: true,
            chunkFilename: '[id].[contenthash].css',
            ignoreOrder: true,
            linkType: 'text/css'
        }),
    ],
}

module.exports = devConfig