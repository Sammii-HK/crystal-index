'use strict';

module.exports = {
  publicPath: process.env.NODE_ENV === 'development'
    ? '/crystal-app/'
    : '/',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  chainWebpack: config => config.plugins.delete('prefetch'),
};
