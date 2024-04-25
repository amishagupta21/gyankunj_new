var path = require('path');
var webpack = require("webpack");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/app.js',
  devtool: 'source-map',
    mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/preset-react'] },
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'images',
            outputPath: 'images',
          }
        }
      },
]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // Opens a server for interactive analysis
      analyzerHost: 'localhost', // Customize the server host (optional)
      analyzerPort: 3000, // Customize the server port (optional)
    }),
  ],
  output: {
    path: path.resolve(__dirname, './src/vendor'),
    filename: 'bundle.min.js'
  }
};