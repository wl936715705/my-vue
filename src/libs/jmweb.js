/**
 * @class Jmweb
 * @constructor 配置
 * @description jimi前端公用库整合
 */
class Jmweb {
  constructor (config) {
    this.config = config || {}
  }

  // request (obj) {
  //   let json = {
  //     url: obj.url || '',
  //     method: obj.method || 'GET',
  //     contentType: obj.contentType || 'application/json',
  //     data: obj.data || {}
  //   }
  //   return new Promise(function (resolve, reject) {
  //     axios({
  //       url: json.url
  //     }).then(function (res) {
  //
  //     }).catch(function (res) {
  //
  //     })
  //   })
  //
  // }

  /**
   * 区分ios和安卓返回的数据转为对象
   * @param  {object} data 需要被转换的字符串
   */
  getObject (data) {
    let obj = '';
    console.log(typeof data)
    if (typeof data != 'object') {
      obj = JSON.parse(data)
    } else {
      obj = data
    }
    return obj
  }

  /**
   * 区分ios和安卓将对象转为json
   * @param  {object} data 需要被转换的对象
   */
  getJson (data) {
    let obj = '';
    if (typeof data != 'string') {
      obj = JSON.stringify(data);
    } else {
      obj = data;
    }
    return obj
  }

  /**
   * 通用的请求的数据
   * @param {string} command  //代表功能类型
   * @param {string} data   //相关指令所需要的json数据
   */
  getData (command, data) {
    let obj = {
      'command':command,
    };
    if(data){
      obj.data = JSON.stringify(data);
    }
    return obj
  }

  /**
   * 回调事件
   * @param name
   * @param fn
   */
  callBack (name, fn) {
    window[name] = (data) =>{
      fn && fn(data)
    }
  }

  /**
   * 回调事件
   * @param {object} param  //param.name 挂载方法名字,param.onSuccess 成功回调,param.onFail 失败回调
   */
  baseCallBack (param) {
    window[param.name] = {
      onSuccess(obj){
        param.onSuccess && param.onSuccess(obj)
      },
      onFail(obj){
        param.onFail && param.onFail(obj)
      },
      onComplete(obj){
        param.onComplete && param.onComplete(obj)
      }
    }
  }

  /**
   * 访问app方法的封装
   * @param  {object} data  参数
   * @param  {string} method 方法父级名
   * @param  {string} children 访问方法
   */
  provider (data, method, children) {
    let jsonData = JSON.stringify(data);
    this.judge(jsonData, method, children)
  }

  /**
   * 将固定函数转为字符串
   * @param  {string} name 方法名称
   */
  setAppJson (name) {
    let setData = this.jsonObj(name + '.onSuccess', name + '.onFail', name + '.onComplete');
    return setData
  }

  /**
   * 参数赋值
   * @param  {string} onSuccess 成功方法名
   * @param  {string} onFail  失败方法名
   * @param  {string} onComplete  其他的方法名
   */
  jsonObj (onSuccess, onFail, onComplete) {
    // let jsonObj = {
    //   onSuccess: onSuccess,
    //   onFail: onFail,
    //   onComplete: onComplete
    // };
    // return jsonObj
    return {
        onSuccess: onSuccess,
        onFail: onFail,
        onComplete: onComplete
      }
  }

  /**
   * 访问app的方法
   * @param  {object} data  参数
   * @param  {string} method 方法父级名
   * @param  {string} children 访问方法
   */
  judge (data, method, children) {
    console.info(data);
    let selectValue = '';
    let obj = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      selectValue = method + '.' + children;
      window.webkit.messageHandlers[selectValue].postMessage(data);
    } else if (/(Android)/i.test(navigator.userAgent)) {
      window[method][children](data);
    } else {}
  }

  /**
   * @returns {String} 当前浏览器名称
   */
  getExplorer () {
    const ua = window.navigator.userAgent;
    const isExplorer = (exp) => {
      return ua.indexOf(exp) > -1
    };
    if (isExplorer('MSIE')) return 'IE';
    else if (isExplorer('Firefox')) return 'Firefox';
    else if (isExplorer('Chrome')) return 'Chrome';
    else if (isExplorer('Opera')) return 'Opera';
    else if (isExplorer('Safari')) return 'Safari'
  }

  /**
   * @description 绑定事件 on(element, event, handler)
   */
  on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * @description 解绑事件 off(element, event, handler)
   */
  off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()

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
    localStorage.clear();
    sessionStorage.clear()
  }
}

/**
 * 数组处理
 * @type {{hasOneOf: (function(Array, Array): boolean), isEqual: Jmweb.array.isEqual, getUnion: (function(Array, Array): *[]), getIntersection: (function(Array, Array): [])}}
 */
Jmweb.prototype.array = {
  /**
   * 数组是否相等
   * @param {Array} a
   * @param {Array} b
   * @returns {boolean}
   */
  isEqual: function (a, b) {
    // 判断数组的长度
    if (a.length !== b.length) {
      return false
    } else {
      // 循环遍历数组的值进行比较
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false
        }
      }
      return true
    }
  },

  /**
   * @param {Array} arr1
   * @param {Array} arr2
   * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
   */
  getIntersection: function (arr1, arr2) {
    let len = Math.min(arr1.length, arr2.length);
    let i = -1;
    let res = [];
    while (++i < len) {
      const item = arr2[i];
      if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
  },

  /**
   * @param {Array} arr1
   * @param {Array} arr2
   * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
   */
  getUnion: function(arr1, arr2) {
    return Array.from(new Set([...arr1, ...arr2]))
  },

  /**
   * @param {Array} target 目标数组
   * @param {Array} arr 需要查询的数组
   * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
   */
  hasOneOf: function (target, arr) {
    return target.some(_ => arr.indexOf(_) > -1)
  }
};

/**
 * 字符串处理
 * @type {{oneOf: Jmweb.string.oneOf, getOneLen: (function(string, string): number)}}
 */
Jmweb.prototype.string = {
  /**
   * 查找字符串某个值出现多少次
   * @param {string} str 查找目标母体
   * @param {string} val 查找目标指定值
   * @returns {number}
   */
  getOneLen: function(str, val) {
    let num = 0;
    for(let i = 0; i < str.length; i++){
      if(str[i] === val){
        num++
      }
    }
    return num
  },

  /**
   * @param {*} validList 用来验证的目标列表
   * @param {String|Number} value 要验证的字符串或数值
   */
  oneOf: function(validList, value) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  }
};

/**
 * 时间处理
 * @type {{formatDate: (function(*, *=): *), getRelativeTime: (function((String|Number)): *), getHandledValue: (function(Number): *), getDate: (function(Number, Number): string), isMillisecond: (function(Number): boolean), isEarly: (function(Number, Number): boolean)}}
 */
Jmweb.prototype.date = {
  /**
   * @param {Number} timeStamp 判断时间戳格式是否是毫秒
   * @returns {Boolean}
   */
  isMillisecond: function (timeStamp) {
    const timeStr = String(timeStamp);
    return timeStr.length > 10
  },

  /**
   * @param {Number} timeStamp 传入的时间戳
   * @param {Number} currentTime 当前时间时间戳
   * @returns {Boolean} 传入的时间戳是否早于当前时间戳
   */
  isEarly: function (timeStamp, currentTime) {
    return timeStamp < currentTime
  },

  /**
   * @param {Number} num 数值
   * @returns {String} 处理后的字符串
   * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
   */
  getHandledValue: function (num) {
    return num < 10 ? '0' + num : num
  },

  /**
   * @param {Number} timeStamp 传入的时间戳
   * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
   */
  getDate: function (timeStamp, startType) {
    /* 传入的时间戳如果为秒，则换算为毫秒 */
    if (this.isMillisecond(timeStamp)) {
      timeStamp = timeStamp;
    } else {
      timeStamp = timeStamp * 1000;
    }
    const d = new Date(timeStamp);
    const year = d.getFullYear();
    const month = this.getHandledValue(d.getMonth() + 1);
    const date = this.getHandledValue(d.getDate());
    const hours = this.getHandledValue(d.getHours());
    const minutes = this.getHandledValue(d.getMinutes());
    const second = this.getHandledValue(d.getSeconds());
    let resStr = '';
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second;
    else resStr = month + '-' + date + ' ' + hours + ':' + minutes;
    return resStr
  },

  /**
   * @param {String|Number} timeStamp 时间戳
   * @returns {String} 相对时间字符串
   */
  getRelativeTime: function (timeStamp) {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = this.isMillisecond(timeStamp);
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) timeStamp = Math.floor(timeStamp / 1000);
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp);
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000);
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = this.isEarly(timeStamp, currentTime);
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp;
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff;
    let resStr = '';
    const dirStr = IS_EARLY ? '前' : '后';
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr;
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr;
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr;
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr;
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = this.getDate(timeStamp);
    else resStr = this.getDate(timeStamp, 'year');
    return resStr
  },

  /**
   * 时间格式化
   * @param date
   * @param fmt
   * @returns {*}
   */
  formatDate: function(date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
};

/**
 * 数据缓存 原base.js Cache模块
 * @type {{getCache: Jmweb.Cache.getCache, setCache: Jmweb.Cache.setCache}}
 */
Jmweb.prototype.Cache = {
  /**
   * 设置缓存的回调
   * @param {string} name  // 挂载方法名字
   * @param {object} params  // param.key ,param.value
   */
  setCache: function(name, params) {
    let obj = Jmweb.prototype.setAppJson(name)
    obj.key = params.key;
    obj.data = params.value;
    console.info(obj);
    console.info('jm_cache.set');
    Jmweb.prototype.provider(obj, 'jm_cache', 'set')
  },

  /**
   * 设置缓存的回调
   * @param {string} name  // 挂载方法名字
   * @param {string} key  // key
   */
  getCache: function(name, key) {
    let obj = Jmweb.prototype.setAppJson(name);
    obj.key = key;
    Jmweb.prototype.provider(obj, 'jm_cache', 'get')
  }
};

/**
 * 设备  原base.js Device模块
 * @type {{sysGetInfo: Jmweb.Device.sysGetInfo}}
 */
Jmweb.prototype.Device = {
  /**
   * 获取系统信息
   * @param {string} name
   */
  sysGetInfo: function (name) {
    let obj = Jmweb.prototype.setAppJson(name);
    Jmweb.prototype.provider(obj, 'jm_device_sys', 'getInfo')
  }
};

/**
 * 页面  原base.js Uinav模块
 * @type {{newPage: Jmweb.Uinav.newPage, back: Jmweb.Uinav.back, toHome: Jmweb.Uinav.toHome, closePage: Jmweb.Uinav.closePage}}
 */
Jmweb.prototype.Uinav = {
  /**
   * 新建一个页面
   * @param {string} name  // 挂载方法名字
   * @param {string} params  // 参数
   */
  newPage: function(name, params) {
    let obj = Jmweb.prototype.setAppJson(name);
    obj.url = params.url; //地址
    obj.param = params.param;  //参数
    obj.title = params.title;  //次级界面标题
    obj.playType = params.playType ? params.playType : 0; //0:默认（不使用播放器），1：RTMP，2：TUTK
    obj.navigationBarHidden = params.navigationBarHidden ? true : false;
    if(obj.navigationBarBackgroundColor){
      obj.navigationBarBackgroundColor =  params.navigationBarBackgroundColor; //导航栏背景颜色，如 #000000
    }
    if(obj.navigationBarTextStyle){
      obj.navigationBarTextStyle = params.navigationBarTextStyle; //导航栏标题颜色，仅支持 black / white
    }
    Jmweb.prototype.provider(obj, 'jm_uinav', 'newPage')
  },

  /**
   * 返回上一个页面（回退）
   * @param {string} name  // 挂载方法名字
   * @param {boolean} isReload  // 返回界面是否刷新
   */
  back: function (name, isReload) {
    let obj = Jmweb.prototype.setAppJson(name);
    obj.isReload = (isReload == 1) ? 1 : 0; //地址
    Jmweb.prototype.provider(obj, 'jm_uinav', 'back')
  },

  /**
   * 关闭界面
   * @param {string} name  // 挂载方法名字
   */
  closePage: function (name) {
    let obj = Jmweb.prototype.setAppJson(name);
    Jmweb.prototype.provider(obj, 'jm_uinav', 'closePage')
  },

  /**
   * 回到首页
   * @param {string} name  // 挂载方法名字
   */
  toHome: function (name) {
    let obj = Jmweb.prototype.setAppJson(name);
    Jmweb.prototype.provider(obj, 'jm_uinav', 'toHome')
  }
};

/**
 * 上传下传  原base.js ediFile模块
 * @type {{upload: Jmweb.ediFile.upload}}
 */
Jmweb.prototype.ediFile = {
  /**
   * 上传
   * @param {string} name  // 挂载方法名字
   * @param {object} params  // 挂载方法名字
   */
  upload: function (name, params) {
    let obj = Jmweb.prototype.setAppJson(name);
    Jmweb.prototype.provider(obj, 'jm_edi_file', 'upload')
  }
};

/**
 * 原trackMap.js
 * @type {{clearOverlays: Jmweb.trackMap.clearOverlays, addStays: Jmweb.trackMap.addStays, createStays: (function(*, *): []), createMarker: (function(*): BMap.Marker), createPolyline: (function(*=, *): BMap.Polyline), removeOverlay: Jmweb.trackMap.removeOverlay, createPoint: (function(*): BMap.Point), createPoints: (function(*): []), addOverlay: Jmweb.trackMap.addOverlay}}
 */
Jmweb.prototype.trackMap = {
  /**
   * 创建坐标
   * @param latLng
   * @returns {BMap.Point}
   */
  createPoint: function (latLng) {
    return new BMap.Point(latLng.lng, latLng.lat)
  },

  /**
   * 创建标记
   * @param param
   * @returns {BMap.Marker}
   */
  createMarker: function (param) {
    let size = param.size || { width: 30, height: 30 }
    let icon = param.icon || new BMap.Icon(param.iconUrl, new BMap.Size(size.width,size.height))
    let offset = param.offset || { left: 0, top: 0 }
    let marker = new BMap.Marker(param.point, { icon: icon, offset: new BMap.Size(offset ? offset.left : 0, offset ? offset.top : 0) })
    return marker
  },

  /**
   * 创建坐标集合
   * @param arr
   * @returns {[]}
   */
  createPoints: function (arr) {
    let points = [];
    for (let i = 0; i < arr.length; i++) {
      let point = this.createPoint(arr[i].latLng);
      points.push(point);
    }
    return points;
  },

  /**
   * 创建折线
   * @param pointArr
   * @param ops
   * @returns {BMap.Polyline}
   */
  createPolyline: function (pointArr, ops) {
    return new BMap.Polyline(pointArr, {
      strokeColor: ops.color,
      strokeWeight: ops.width,
      strokeOpacity: ops.opacity
    });
  },

  /**
   * 创建停留点
   * @param json
   * @param points
   * @returns {[]}
   */
  createStays: function (json,points) {
    let stays = [];
    for (let i = 0; i < json.length; i++) {
      if (json[i].stay) {
        let stayItem = this.createMarker({
          point: points[i],
          iconUrl: '../../static/images/pause.png',
          offset: { left: 0, top: -13 }
        });
        stayItem.index = i;
        stays.push(stayItem);
      }
    }
    return stays;
  },

  /**
   * 创建多个停留点
   * @param stayMap
   * @param stays
   */
  addStays: function (stayMap,stays) {
    for (let i = 0; i < stays.length; i++) {
      let marker = stays[i];
      stayMap.addOverlay(marker);
    }
  },

  /**
   * 创建多个属性
   * @param map
   */
  addOverlay: function (map) {
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i]) {
        arguments[0].addOverlay(arguments[i]);
      }
    }
  },

  /**
   * 删除设置某个配置
   * @param map
   */
  removeOverlay: function (map) {
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i]) {
        arguments[0].removeOverlay(arguments[i]);
      }
    }
  },

  /**
   * 清除所有遮盖物
   * @param map
   */
  clearOverlays: function (map) {
    map.clearOverlays();
  }
};

/**
 * 原coordinate.js
 * @type {{baiduToChina: (function(number, number): {lng: *, lat: *}), transformLat: (function(*=, *): number), chinaToGPSExact: (function(number, number): {lng: *, lat: *}), delta: (function(*, *): {lng: *, lat: *}), GPSToChina: Jmweb.GPS.GPSToChina, chinaToGPS: Jmweb.GPS.chinaToGPS, transformLng: (function(*=, *): *), chinaToBaidu: (function(number, number): {lng: *, lat: *}), outOfChina: Jmweb.GPS.outOfChina, mercatorToGPS: (function(number, number): {lng: *, lat: *}), x_pi: number, PI: number, GPSToMercator: (function(number, number): {lng: *, lat: *})}}
 */
Jmweb.prototype.GPS = {
  PI: 3.14159265358979324,
  x_pi: 3.14159265358979324 * 3000.0 / 180.0,
  /**
   *
   * @param lat
   * @param lng
   * @returns {{lng: *, lat: *}}
   */
  delta: function (lat, lng) {
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lng - 105.0, lat - 35.0);
    let dLng = this.transformLng(lng - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * this.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
    dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
    return {
      'lat': dLat,
      'lng': dLng
    }
  },
  /**
   * WGS-84 to GCJ-02 GPS坐标转中国坐标
   * @param  {number} wgsLat GPS纬度
   * @param  {number} wgsLng GPS经度
   * @return {object}        返回中国坐标经纬度对象
   */
  GPSToChina: function (wgsLat, wgsLng) {
    if (this.outOfChina(wgsLat, wgsLng))
      return {
        'lat': wgsLat,
        'lng': wgsLng
      };
    let d = this.delta(wgsLat, wgsLng);
    return {
      'lat': Number(wgsLat) + Number(d.lat),
      'lng': Number(wgsLng) + Number(d.lng)
    }
  },
  /**
   * GCJ-02 to WGS-84 中国标准坐标转GPS坐标
   * @param  {number} gcjLat 中国标准坐标纬度
   * @param  {number} gcjLng 中国标准坐标经度
   * @return {object}        返回GPS经纬度对象
   */
  chinaToGPS: function (gcjLat, gcjLng) {
    if (this.outOfChina(gcjLat, gcjLng))
      return {
        'lat': gcjLat,
        'lng': gcjLng
      };
    let d = this.delta(gcjLat, gcjLng);
    return {
      'lat': Number(gcjLat) - Number(d.lat),
      'lng': Number(gcjLng) - Number(d.lng)
    }
  },
  /**
   * GCJ-02 to WGS-84 exactly 中国标准坐标转GPS坐标(精确)
   * @param  {number} gcjLat  中国标准坐标纬度
   * @param  {number} gcjLng  中国标准坐标经度
   * @return {object}         返回GPS经纬度对象(精确)
   */
  chinaToGPSExact: function (gcjLat, gcjLng) {
    let initDelta = 0.01;
    let threshold = 0.000000001;
    let dLat = initDelta,
      dLng = initDelta;
    let mLat = gcjLat - dLat,
      mLng = gcjLng - dLng;
    let pLat = gcjLat + dLat,
      pLng = gcjLng + dLng;
    let wgsLat, wgsLng, i = 0;
    while (1) {
      wgsLat = (mLat + pLat) / 2;
      wgsLng = (mLng + pLng) / 2;
      let tmp = this.gcj_encrypt(wgsLat, wgsLng);
      dLat = tmp.lat - gcjLat;
      dLng = tmp.lng - gcjLng;
      if ((Math.abs(dLat) < threshold) && (Math.abs(dLng) < threshold))
        break;

      if (dLat > 0) pLat = wgsLat;
      else mLat = wgsLat;
      if (dLng > 0) pLng = wgsLng;
      else mLng = wgsLng;

      if (++i > 10000) break;
    }
    //console.log(i);
    return {
      'lat': wgsLat,
      'lng': wgsLng
    }
  },
  /**
   * GCJ-02 to BD-09 中国标准坐标转百度坐标(精确)
   * @param  {number} gcjLat  中国标准坐标纬度
   * @param  {number} gcjLng  中国标准坐标经度
   * @return {object}         返回百度经纬度对象
   */
  chinaToBaidu: function (gcjLat, gcjLng) {
    let x = gcjLng,
      y = gcjLat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
    bdLng = z * Math.cos(theta) + 0.0065;
    bdLat = z * Math.sin(theta) + 0.006;
    return {
      'lat': bdLat,
      'lng': bdLng
    }
  },
  /**
   * BD-09 to GCJ-02 百度坐标转中国标准坐标
   * @param  {number} bdLat  百度坐标纬度
   * @param  {number} bdLng  百度坐标经度
   * @return {object}        返回中国标准经纬度对象
   */
  baiduToChina: function (bdLat, bdLng) {
    let x = bdLng - 0.0065,
      y = bdLat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
    let gcjLng = z * Math.cos(theta);
    let gcjLat = z * Math.sin(theta);
    return {
      'lat': gcjLat,
      'lng': gcjLng
    }
  },
  /**
   * WGS-84 to Web mercator GPS坐标转墨卡托坐标
   * @param  {number} wgsLat GPS纬度
   * @param  {number} wgsLng GPS经度
   * @return {object}        返回墨卡托经纬度对象
   */
  GPSToMercator: function (wgsLat, wgsLng) {
    let x = wgsLng * 20037508.34 / 180.;
    let y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
    y = y * 20037508.34 / 180.;
    return {
      'lat': y,
      'lng': x
    };
    /*
    if ((Math.abs(wgsLng) > 180 || Math.abs(wgsLat) > 90))
        return null;
    var x = 6378137.0 * wgsLng * 0.017453292519943295;
    var a = wgsLat * 0.017453292519943295;
    var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    return {'lat' : y, 'lng' : x};
    //*/
  },
  /**
   * Web mercator to WGS-84 墨卡托坐标转GPS坐标
   * @param  {number} mercatorLat 墨卡托纬度
   * @param  {number} mercatorLng 墨卡托经度
   * @return {object}             返回GPS经纬度对象
   */
  mercatorToGPS: function (mercatorLat, mercatorLng) {
    let x = mercatorLng / 20037508.34 * 180.;
    let y = mercatorLat / 20037508.34 * 180.;
    y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
    return {
      'lat': y,
      'lng': x
    };
    /*
    if (Math.abs(mercatorLng) < 180 && Math.abs(mercatorLat) < 90)
        return null;
    if ((Math.abs(mercatorLng) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
        return null;
    var a = mercatorLng / 6378137.0 * 57.295779513082323;
    var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
    var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
    return {'lat' : y, 'lng' : x};
    //*/
  },
  /**
   * 是否在中国之外
   * @param  {number} lat 纬度
   * @param  {number} lng 经度
   * @return {boolean]}     返回结果真或假
   */
  outOfChina: function (lat, lng) {
    if (lng < 72.004 || lng > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false
  },
  transformLat: function (x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
    return ret
  },
  transformLng: function (x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
    return ret
  }
};

/**
 * 蓝牙 原blue.js
 * @type {{request: Jmweb.jmBlue.request, closeBLEConnection: Jmweb.jmBlue.closeBLEConnection, clearAdapter: Jmweb.jmBlue.clearAdapter, startDevicesDiscovery: Jmweb.jmBlue.startDevicesDiscovery, writeBLECharacteristicValue: Jmweb.jmBlue.writeBLECharacteristicValue, initBle: Jmweb.jmBlue.initBle, readBLECharacteristicValue: Jmweb.jmBlue.readBLECharacteristicValue, createBLEConnection: Jmweb.jmBlue.createBLEConnection, bleType: Jmweb.jmBlue.bleType, getAdapterState: Jmweb.jmBlue.getAdapterState, notifyBLECharacteristicValueChange: Jmweb.jmBlue.notifyBLECharacteristicValueChange, stopDevicesDiscovery: Jmweb.jmBlue.stopDevicesDiscovery, getBLEDeviceCharacteristics: Jmweb.jmBlue.getBLEDeviceCharacteristics, openAdapter: Jmweb.jmBlue.openAdapter, getBLEDeviceServices: Jmweb.jmBlue.getBLEDeviceServices, getConnectedDevices: Jmweb.jmBlue.getConnectedDevices}}
 */
Jmweb.prototype.jmBlue = {
  /**
   * 蓝牙传输数据类型
   * @param {string} dataType 蓝牙传输数据类型
   */
  bleType: function (dataType) {
    let data = {
      'dataType': dataType
    };
    let obj = Jmweb.prototype.getData('bleType', data);
    this.request(obj)
  },
  /**
   * 初始化蓝牙
   */
  initBle: function () {
    let obj = Jmweb.prototype.getData('initBle');
    this.request(obj)
  },
  /**
   * 打开蓝牙
   */
  openAdapter: function () {
    let obj = Jmweb.prototype.getData('openAdapter');
    this.request(obj)
  },
  /**
   * 获取手机蓝牙开关状态
   */
  getAdapterState: function () {
    let obj = Jmweb.prototype.getData('getAdapterState');
    this.request(obj)
  },
  /**
   * 关闭蓝牙模块
   */
  clearAdapter: function () {
    let obj = Jmweb.prototype.getData('clearAdapter');
    this.request(obj)
  },
  /**
   * 扫描蓝牙设备
   * @param {string} services 主 service 的 uuid
   */
  startDevicesDiscovery: function (services) {
    let data = {
      'services': services
    };
    let obj = Jmweb.prototype.getData('startDevicesDiscovery', data);
    this.request(obj)
  },
  /**
   * 关闭扫描
   */
  stopDevicesDiscovery: function () {
    let obj = Jmweb.prototype.getData('stopDevicesDiscovery');
    this.request(obj)
  },
  /**
   * 连接蓝牙
   * @param {string} deviceId  //蓝牙设备 id
   * @param {boolean} autoConnect  //是否重连（仅安卓使用）
   */
  createBLEConnection: function (deviceId, autoConnect) {
    let data = {
      'deviceId': deviceId,
      'autoConnect': autoConnect,
    };
    let obj = Jmweb.prototype.getData('createBLEConnection', data);
    this.request(obj)
  },
  /**
   * 关闭蓝牙
   * @param {string} deviceId  //蓝牙设备 id
   */
  closeBLEConnection: function (deviceId) {
    let data = {
      'deviceId': deviceId
    };
    let obj = Jmweb.prototype.getData('closeBLEConnection', data);
    this.request(obj)
  },
  /**
   * 获取处于已连接状态的设备
   */
  getConnectedDevices: function (deviceId) {
    let data = {
      'deviceId': deviceId
    };
    let obj = Jmweb.prototype.getData('getConnectedDevices', data);
    this.request(obj)
  },
  /**
   * 获取蓝牙设备所有 service（服务）的示例
   * @param {string} deviceId  //蓝牙设备 id
   */
  getBLEDeviceServices: function (deviceId) {
    let data = {
      'deviceId': deviceId
    };
    let obj = Jmweb.prototype.getData('getBLEDeviceServices', data);
    console.log(obj, '当前所获取的所有蓝牙设备的服务信息。。。。。。。。。。。。。。。。。。。');
    this.request(obj)
  },
  /**
   * 获取蓝牙设备某个服务中的所有 characteristic（特征值）
   * @param {string} deviceId  //蓝牙设备 id
   * @param {string} serviceId  //蓝牙服务 uuid
   */
  getBLEDeviceCharacteristics: function (deviceId, serviceId) {
    let data = {
      'deviceId': deviceId,
      'serviceId': serviceId,
    };
    let obj = Jmweb.prototype.getData('getBLEDeviceCharacteristics', data);
    this.request(obj)
  },
  /**
   * 读取低功耗蓝牙设备的特征值的二进制数据值
   * @param {string} deviceId  //蓝牙设备 id
   * @param {string} serviceId  //蓝牙服务 uuid
   * @param {string} characteristicId  //蓝牙特征值的 uuid
   */
  readBLECharacteristicValue: function (deviceId, serviceId, characteristicId) {
    let data = {
      'deviceId': deviceId,
      'serviceId': serviceId,
      'characteristicId': characteristicId
    };
    let obj = Jmweb.prototype.getData('readBLECharacteristicValue', data);
    this.request(obj)
  },
  /**
   * 向低功耗蓝牙设备特征值中写入二进制数据。
   * @param {string} deviceId  //蓝牙设备 id
   * @param {string} serviceId  //蓝牙服务 uuid
   * @param {string} characteristicId  //蓝牙特征值的 uuid
   * @param {string} value  //蓝牙设备特征值对应的二进制值
   */
  writeBLECharacteristicValue: function (deviceId, serviceId, characteristicId, value) {
    let data = {
      'deviceId': deviceId,
      'serviceId': serviceId,
      'characteristicId': characteristicId,
      'value': value
    };
    let obj = Jmweb.prototype.getData('writeBLECharacteristicValue', data);
    this.request(obj)
  },
  /**
   * 向低功耗蓝牙设备特征值中写入二进制数据。
   * @param {string} deviceId  //蓝牙设备 id
   * @param {string} serviceId  //蓝牙服务 uuid
   * @param {string} characteristicId  //蓝牙特征值的 uuid
   * @param {boolean} state  //true: 启用 notify; false: 停用 notify
   */
  notifyBLECharacteristicValueChange: function (deviceId, serviceId, characteristicId, state) {
    let data = {
      'deviceId': deviceId,
      'serviceId': serviceId,
      'characteristicId': characteristicId,
      'state': state
    };
    let obj = Jmweb.prototype.getData('notifyBLECharacteristicValueChange', data);
    this.request(obj)
  },
  /**
   * 调用蓝牙通用请求
   * @param {object} obj
   */
  request: function (obj) {
    Jmweb.prototype.provider(obj, 'jm_dev_blue', 'command')
  }
};

/**
 * wifi 原wifi.js
 * @type {{disconnect: Jmweb.jmWifi.disconnect, request: Jmweb.jmWifi.request, openWifi: Jmweb.jmWifi.openWifi, closeWifi: Jmweb.jmWifi.closeWifi, clearWifi: Jmweb.jmWifi.clearWifi, scan: Jmweb.jmWifi.scan, getWiFiInfo: Jmweb.jmWifi.getWiFiInfo, connect: Jmweb.jmWifi.connect}}
 */
Jmweb.prototype.jmWifi = {
  /**
   * 开启wifi
   */
  openWifi: function () {
    let obj = Jmweb.prototype.getData('openWifi');
    this.request(obj)
  },

  /**
   * 开启wifi
   */
  getWiFiInfo: function () {
    let obj = Jmweb.prototype.getData('getWiFiInfo');
    this.request(obj)
  },

  /**
   * 关闭wifi
   */
  closeWifi: function () {
    let obj = Jmweb.prototype.getData('closeWifi');
    this.request(obj)
  },

  /**
   * wifi扫描
   */
  scan: function () {
    let obj = Jmweb.prototype.getData('scan');
    this.request(obj)
  },

  /**
   * 连接 Wi-Fi
   * @param {string} ssid  //wifi名称
   * @param {string} bssid  //wifi mac地址
   * @param {string} capabilities  //wifi 加密方式
   * @param {string} level  //wifi密码
   */
  connect: function (ssid, bssid, capabilities, level) {
    let data = {
      'ssid':ssid,
      'bssid':bssid,
      'capabilities':capabilities,
      'level':level
    };
    let obj = Jmweb.prototype.getData('connect',data);
    this.request(obj)
  },

  /**
   * 断开连接
   * @param {string} ssid  //wifi名称
   * @param {string} secure  //wifi加密方式
   * @param {string} password  //wifi密码
   */
  disconnect: function (ssid, secure, password) {
    let data = {
      'ssid':ssid,
      'secure':secure,
      'password':password,
    };
    let obj = Jmweb.prototype.getData('disconnect',data);
    this.request(obj)
  },

  /**
   * 清除wifi配置
   */
  clearWifi: function () {
    let obj = Jmweb.prototype.getData('clearWifi');
    this.request(obj)
  },

  /**
   * 调用wifi通用请求
   * @param {object} obj
   */
  request: function (obj) {
    Jmweb.prototype.provider(obj, 'jm_dev_wifi', 'command')
  }
};

export default Jmweb
