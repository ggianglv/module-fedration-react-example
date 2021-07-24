const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
    publicPath: 'http://localhost:3003/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,

        loader:
          'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'remote_app',
        filename: 'remoteEntry.js',
        exposes: {
          './RemoteComponent': './src/RemoteComponent',
        },
      },
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};
