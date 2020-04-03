import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import templateHtml from 'html-webpack-template'
import CONFIG from './config/app.config'
import webpack from 'webpack'
import { CleanWebpackPlugin as CleanFolder } from 'clean-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const distPath = 'dist'
const environment = process.env.NODE_ENV.trim()

const uglifyConfig = new UglifyJsPlugin({
  test: /\.js(\?.*)?$/i,
  cache: true,
  parallel: true,
  sourceMap: environment === 'production',
  uglifyOptions: {
    output: {
      comments: false,
    },
  },
})

const htmlPlugin = new HtmlWebpackPlugin({
  template: templateHtml,
  filename: './index.html',
  appMountId: 'app', // Id app mount React
  title: 'Teste webpack html plugin',
  lang: 'pt-br',
  meta: CONFIG.meta,
  inject: false, // it is necessary to avoid duplicate meta tags and to allows html-webpack-template works properly
})

export default {
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex to find files that webpack applies
        resolve: {
          extensions: ['.js', '.jsx', '.styl'], // resolves files extensiosn
        },
        exclude: /node_modules/, // avoiding node_module folders
        use: {
          loader: 'babel-loader', // using babel loader for transpiling es6 to es5
          options: {
            cacheDirectory: true, // option to transpile only modfied files
          },
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool:
    environment === 'development'
      ? 'node'
      : 'source-map' /* testing if it's in development mode or production  (to generate soucermap file for minified js file) */,
  optimization: {
    minimizer: environment === 'production' ? [uglifyConfig] : [],
  },
  entry: './src/index.js', // main file to generates the bundle
  output: {
    // output settings
    path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
    filename: `js/index${environment === 'development' ? '' : '.min'}.js`, // it sets the name according to the development/production mode
    publicPath: '/',
  },
  plugins: [
    // define plugins used by webpack and its properties/settings
    // [`${distPath}/*`], { root: __dirname }
    new CleanFolder(),
    htmlPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        VARIABLE: JSON.stringify('testando'), // sending process.env varible called VARIABLE with 'testando' value
      },
    }),
  ],
  devServer: {
    // webpack dev server settings
    contentBase: path.join(__dirname, distPath), // point to the path to run on server
    compress: true, // it defines if it should be compressed
    watchContentBase: true, // watch changes on file and re-run the application
    port: 3000, // port
    historyApiFallback: true, // it's used to fix router problemas with react-router and index.html defaull fallback https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    writeToDisk: true, // Tells devServer to write generated assets to the disk.
  },
}
