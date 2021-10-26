/*
 * @Date: 2021-10-25 21:22:42
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-25 21:39:07
 * @FilePath: \VueProject\gshop\src\mock\serve.js
 */
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})