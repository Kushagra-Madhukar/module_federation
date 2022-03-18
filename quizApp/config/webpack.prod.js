const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        moduleIds: 'deterministic',
        minimizer: [`...`],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 20,
            maxInitialRequests: 20,
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    minSize: 0,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    enforce: true
                },
                styles: { // combines css in one file
                    name: 'styles',
                    test: /\.css$/i,
                    type: "css/mini-extract",
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}}
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            experimentalUseImportModule: true,
            chunkFilename: '[id].[contenthash].css',
            ignoreOrder: true,
            linkType: 'text/css'
        }),
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Production')
        })
    ],
}