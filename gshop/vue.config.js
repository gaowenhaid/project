/*
 * @Date: 2021-10-18 17:06:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 18:46:57
 * @FilePath: \VueProject\gshop\vue.config.js
 */
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 代理实现跨域问题
  devServer: {
    proxy: {
      "/api": {
        // 配置代理 端口和协议ip
        target: "http://39.98.123.211",
        // pathRewrite: {"^/api" : ""}
      }
    }
  }

}