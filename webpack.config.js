const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: __dirname + "/src/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   importLoaders: 1,
            //   localIdentName: "[name]_[local]_[hash:base64]",
            //   sourceMap: true,
            //   minimize: true
            // }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: './images/[name].[ext]',
          limit: 10000
        },
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template:  __dirname + "/src/index.html",
      inject: 'body'
    })],
  devServer: {
    port: process.env.PORT || 4000,
    contentBase: './dist',
    historyApiFallback: true
  }
};