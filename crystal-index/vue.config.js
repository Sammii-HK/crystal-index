module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    disableHostCheck: true,
    public: 'sammii.ddns.net:80',
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://crystalsbackend:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}
