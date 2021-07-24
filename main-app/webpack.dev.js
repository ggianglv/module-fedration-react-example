const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
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
        remotes: {
          remote_app: 'remote_app@http://localhost:3003/remoteEntry.js',
        },
      },
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};
