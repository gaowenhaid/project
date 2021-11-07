/*
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-07 21:02:18
 * @FilePath: \VueProject\gshop\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 饿了么ui用的配置
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
