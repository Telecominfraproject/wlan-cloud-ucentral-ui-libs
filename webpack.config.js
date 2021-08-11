/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'index.js',
    library: 'ucentral-libs',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    alias: {
      src: path.resolve(__dirname, './src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'prop-types': path.resolve(__dirname, './node_modules/prop-types'),
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
      '@coreui/coreui': path.resolve(__dirname, './node_modules/@coreui/coreui'),
      '@coreui/icons': path.resolve(__dirname, './node_modules/@coreui/icons'),
      '@coreui/icons-react': path.resolve(__dirname, './node_modules/@coreui/icons-react'),
      '@coreui/react': path.resolve(__dirname, './node_modules/@coreui/react'),
      '@coreui/react-chartjs': path.resolve(__dirname, './node_modules/@coreui/react-chartjs'),
    },
  },
  plugins: [new CleanWebpackPlugin()],
};
