module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
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
