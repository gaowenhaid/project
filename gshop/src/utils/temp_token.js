/*
 * @Date: 2021-11-02 20:01:12
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-02 20:02:33
 * @FilePath: \gshop\src\utils\temp_token.js
 */
import { v4 as uuidv4 } from 'uuid';
export const userTemp = () => {
    // 创建一个变量 读取出 本地存储仓是否有 USERINFO 这个参数
    let userInfo = localStorage.getItem('USERINFO')

    // 如果没有的话(第一次进来肯定没有)
    if (!userInfo) {

        // 没有的话,就为其创建一个 唯一标识(使用 uuid)
        userInfo = uuidv4();

        // 然后在本地存储仓里将 我们创建好的 唯一标识 存储进去
        localStorage.setItem('USERINFO', JSON.stringify(userInfo))
    }
    // 然后将唯一 id  返回回去
    return userInfo
}