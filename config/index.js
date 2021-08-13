'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/tools-service': {
        target: 'http://apiupload.edu.eggsoft.cn',//设置你调用的接口域名和端口号npm run eureka 48001    npm run dev 48028   别忘了加http'http://localhost:38030'  http://api.edu.eggsoft.cn
        changeOrigin: true,
        pathRewrite: {
          '^/tools-service': '/tools-service'//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/apis': {
        target: 'http://api.edu.eggsoft.cn',//设置你调用的接口域名和端口号npm run eureka 48001    npm run dev 48028   别忘了加http'http://localhost:38030'  http://api.edu.eggsoft.cn
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/Konowledge': {
        target: 'https://testupload.edu.eggsoft.cn/Konowledge',//设置你调用的接口域名和端口号npm run eureka 48001    npm run dev 48028   别忘了加http'http://localhost:38030'  http://api.edu.eggsoft.cn
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: 'https://testupload.edu.eggsoft.cn/Konowledge'
        },
        pathRewrite: {
          '^/Konowledge': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/pdf': {
        target: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/',//设置你调用的接口域名和端口号npm run eureka 48001    npm run dev 48028   别忘了加http'http://localhost:38030'  http://api.edu.eggsoft.cn
        changeOrigin: true,
        pathRewrite: {
          '^/pdf': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      },
      '/PdfEdu': {
        target: 'https://admin.edu.eggsoft.cn/test/StaticImg/PdfEdu',//设置你调用的接口域名和端口号npm run eureka 48001    npm run dev 48028   别忘了加http'http://localhost:38030'  http://api.edu.eggsoft.cn
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: 'https://admin.edu.eggsoft.cn/test/StaticImg/PdfEdu'
        },

        pathRewrite: {
          '^/PdfEdu': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 38016, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
