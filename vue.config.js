module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/m1/4414254-4059226-default',
        changeOrigin: true
      }
    }
  }
}