const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'marketing.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies // or ['react', 'react-dom']
        })
    ]
}

module.exports = devConfig