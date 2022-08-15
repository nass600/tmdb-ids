import ExtensionReloader from 'webpack-extension-reloader'
import path from 'path'
import webpack from 'webpack'
import config from './webpack.config.common.babel'
import merge from 'webpack-merge'

const EXTENSION_RELOADER_PORT = 9090
const PORT = 3000

for (const entryName in config.entry) {
    config.entry[entryName] = [
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/dev-server'
    ].concat(config.entry[entryName])
}

export default merge(config, {
    watch: true,
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtensionReloader({
            port: EXTENSION_RELOADER_PORT,
            reloadPage: true,
            entries: {
                contentScript: 'content',
                background: 'background',
                popup: 'popup',
                options: 'options'
            }
        })
    ].concat(config.plugins),
    devServer: {
        port: PORT,
        hot: true,
        contentBase: path.join(__dirname, '../dist'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        disableHostCheck: true
    }
})
