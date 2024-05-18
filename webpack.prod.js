const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const isProduction = env && env.production === true;

  return {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      publicPath: '/',
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|pdf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'images',
              outputPath: 'images',
            },
          },
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      isProduction && new BundleAnalyzerPlugin({
        analyzerMode: 'static', // Generates an HTML file with the report
        reportFilename: 'bundle-report.html',
        openAnalyzer: false, // Does not open the report automatically
        generateStatsFile: false, // Do not generate the stats.json file
      }),
    ].filter(Boolean),
  };
};
