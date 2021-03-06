const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/marketing.js',
                comprehensive: 'comprehensive@http://localhost:8082/comprehensive.js',
                quiz: 'quiz@http://localhost:8083/quiz.js'
            },
            shared: packageJson.dependencies // or ['react', 'react-dom']
        })
    ]
}

module.exports = devConfig