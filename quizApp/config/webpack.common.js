

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const packageJson = require('../package.json');
const deps = packageJson.dependencies;
const projectRootPath = path.resolve(__dirname, '..');
const buildPath = path.resolve(projectRootPath, './build');

module.exports = {
    context: projectRootPath, //not required
    entry: path.resolve(projectRootPath, './src/index.js'), // not required
    output: {
        path: buildPath,
        globalObject: "this",
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        // publicPath: 
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {    //not required
                    filename: '[name]/[name]-[hash][ext]'
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)?(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/inline'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'quiz',
            filename: 'quiz.js',
            exposes: {
                './QuizApp': './src/bootstrap'
            },
            // shared: deps // or ['react', 'react-dom'] or
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: deps.react
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom']
                },
                'styled-components': {
                    singleton: true,
                    requiredVersion: deps['styled-components'],
                }
            }
        })
    ]
}