// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    //sourceMapFilename: '[name].[hash:8].map',
    //chunkFilename: '[id].[hash:8].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo',
      template: './template/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
    })
  ],
  devServer: {
	  static: path.resolve(__dirname, 'dist'),
  }
};