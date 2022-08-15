import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

export default {
    entry: {
        background: path.resolve(__dirname, 'src/chrome/background/index.ts'),
        content: path.resolve(__dirname, 'src/chrome/content/index.ts'),
        popup: path.resolve(__dirname, 'src/chrome/popup/index.ts'),
        options: path.resolve(__dirname, 'src/chrome/options/index.ts')
    },
    output: {
        publicPath: '',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
        alias: {
            '@api': path.resolve(__dirname, 'src/api'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/assets/styles')
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/chrome/popup/index.html'),
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/chrome/options/index.html'),
            filename: 'options.html',
            chunks: ['options']
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/chrome/manifest.json'),
                    transform: function (content) {
                        return Buffer.from(
                            JSON.stringify({
                                description: process.env.npm_package_description,
                                version: process.env.npm_package_version,
                                ...JSON.parse(content.toString())
                            })
                        )
                    }
                },
                {
                    from: path.resolve(__dirname, 'src/assets/img')
                }
            ]
        })
    ],
    stats: {
        children: false,
        modules: false,
        colors: true
    }
}
