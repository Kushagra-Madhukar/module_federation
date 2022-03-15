const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/'
    },
    devServer: {
        port: 8082,
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
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Development')
        }),
        new ReactRefreshWebpackPlugin()
    ],
}

module.exports = devConfig