const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/')
const port = (+process.env.PORT + 1) || 3001

const config = {
  mode: process.env.NODE_ENV || 'none',

  entry: path.join(__dirname, './src/client'),
  output: {
    path: path.join(__dirname, './src/public'),
    filename: 'client.js',
    publicPath: 'http://localhost:3001/'
  },

  devtool: 'eval',
  devServer: {
    hot: true,
    port,
    open: {
      target: ['http://localhost:3000']
    },
    headers: {
      'Access-Control-Allow-Origin': '*' // this is so 3000 can talk to this dev server at 3001
    },
    devMiddleware: {
      publicPath: 'http://localhost:3001/'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],

  // Load our our javascript code when webpack starts
  resolve: {
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          plugins: [process.env.NODE_ENV !== 'production' && require.resolve('react-refresh/babel')].filter(Boolean)
        }
      }
    ]
  }
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins = config.plugins.concat([
    new ReactRefreshWebpackPlugin()
  ])
}

module.exports = config
