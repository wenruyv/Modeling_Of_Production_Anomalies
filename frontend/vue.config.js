const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/bpmn-xml': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/bpmn-xml': '/bpmn-xml'
        }
      }
    }
  }
};
