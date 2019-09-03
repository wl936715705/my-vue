/**
 * @class Jmweb
 * @constructor 配置
 * @description jimi前端公用库整合
 */
class Jmweb {
  constructor (config) {
    this.config = config || {}
  }

  /**
   * 存储localStorage
   * @param {String} key 存储的键
   * @param {Object} value 存储的数据
   */
  setStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 获取本地存储
   * @param {String} key 本地存储的键
   */
  getStorage (key) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key))
    } else if (sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key))
    } else {
      return null
    }
  }

  /**
   * 删除本地存储
   * @param {String} key 本地存储的键
   */
  removeStorage (key) {
    localStorage.removeItem(key)
  }

  /**
   * 全部删除本地存储
   */
  clearStorage () {
    localStorage.clear()
    sessionStorage.clear()
  }

}

export default new Jmweb()
