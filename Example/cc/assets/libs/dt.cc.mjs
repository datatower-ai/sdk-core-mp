var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/type.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
  LogLevel2[LogLevel2["ASSERT"] = 2] = "ASSERT";
  LogLevel2[LogLevel2["DEBUG"] = 3] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 4] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 5] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 6] = "ERROR";
  return LogLevel2;
})(LogLevel || {});

// src/DataTower.ts
var DataTower = class {
  static init(config) {
    return this.instance.init(config);
  }
  /**
   * 手动启动上报(如果 initSDK 时的 manualEnableUpload 为 true)
   */
  static enableUpload() {
    return this.instance.enableUpload();
  }
  static track(eventName, properties) {
    return this.instance.track(eventName, properties);
  }
  static userSet(properties) {
    return this.instance.userSet(properties);
  }
  static userSetOnce(properties) {
    return this.instance.userSetOnce(properties);
  }
  static userAdd(properties) {
    return this.instance.userAdd(properties);
  }
  static userUnset(properties) {
    return this.instance.userUnset(properties);
  }
  static userDelete() {
    return this.instance.userDelete();
  }
  static userAppend(properties) {
    return this.instance.userAppend(properties);
  }
  static userUniqAppend(properties) {
    return this.instance.userUniqAppend(properties);
  }
  static getDataTowerId(callback) {
    return this.instance.getDataTowerId(callback);
  }
  static getDistinctId(callback) {
    return this.instance.getDistinctId(callback);
  }
  static setAccountId(id) {
    return this.instance.setAccountId(id);
  }
  static setDistinctId(id) {
    return this.instance.setDistinctId(id);
  }
  static setFirebaseAppInstanceId(id) {
    return this.instance.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id) {
    return this.instance.setAppsFlyerId(id);
  }
  static setKochavaId(id) {
    return this.instance.setKochavaId(id);
  }
  static setAdjustId(id) {
    return this.instance.setAdjustId(id);
  }
  static setStaticCommonProperties(properties) {
    return this.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties() {
    return this.instance.clearStaticCommonProperties();
  }
  static setCommonProperties(callback) {
    return this.instance.setCommonProperties(callback);
  }
  static clearCommonProperties() {
    return this.instance.clearCommonProperties();
  }
};

// src/constant.ts
var DefaultConfig = {
  appId: "",
  serverUrl: "",
  channel: "",
  isDebug: false,
  logLevel: 1 /* VERBOSE */,
  manualEnableUpload: false,
  properties: { "#sdk_type": "", "#sdk_version_name": "" }
};
var AndroidClass = "ai/datatower/bridge/DTCocosCreatorProxyApi";
var IOSClass = "DTCocosCreatorProxyApi";

// src/utils.ts
var typeMap = {
  void: "V",
  int: "I",
  float: "F",
  boolean: "Z",
  String: "Ljava/lang/String;"
};
function generateSignature([args, ret]) {
  return `(${args.map((arg) => typeMap[arg]).join("")})${typeMap[ret]}`;
}
function fmt(obj) {
  return JSON.stringify(obj);
}
function logger(...args) {
  console.log("[DataTower SDK]", ...args);
}
function globalNativeCallback(callNative, callback) {
  const callbackName = `__${Date.now()}__`;
  window[callbackName] = (arg) => {
    callback(arg);
    delete window[callbackName];
  };
  callNative(callbackName);
}

// src/sandbox/Sandbox.ts
var Sandbox = class {
  constructor(shim) {
    this.shim = shim;
    this.config = DefaultConfig;
  }
  logger(method, ...args) {
    logger("<Sandbox>", method, args);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    if (this.config.isDebug)
      return this.logger("init", this.config);
  }
  track(eventName, properties) {
    if (this.config.isDebug)
      return this.logger("track", eventName, properties);
  }
  enableUpload() {
    if (this.config.isDebug)
      return this.logger("enableUpload");
  }
  userSet(properties) {
    if (this.config.isDebug)
      return this.logger("userSet", properties);
  }
  userSetOnce(properties) {
    if (this.config.isDebug)
      return this.logger("userSetOnce", properties);
  }
  userAdd(properties) {
    if (this.config.isDebug)
      return this.logger("userAdd", properties);
  }
  userUnset(properties) {
    if (this.config.isDebug)
      return this.logger("userUnset", properties);
  }
  userDelete() {
    if (this.config.isDebug)
      return this.logger("userDelete");
  }
  userAppend(properties) {
    if (this.config.isDebug)
      return this.logger("userAppend", properties);
  }
  userUniqAppend(properties) {
    if (this.config.isDebug)
      return this.logger("userUniqAppend", properties);
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    if (this.config.isDebug)
      return this.logger("getDataTowerId", callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    if (this.config.isDebug)
      return this.logger("getDistinctId");
  }
  setAccountId(id) {
    if (this.config.isDebug)
      return this.logger("setAccountId", id);
  }
  setDistinctId(id) {
    if (this.config.isDebug)
      return this.logger("setDistinctId", id);
  }
  setFirebaseAppInstanceId(id) {
    if (this.config.isDebug)
      return this.logger("setFirebaseAppInstanceId", id);
  }
  setAppsFlyerId(id) {
    if (this.config.isDebug)
      return this.logger("setAppsFlyerId", id);
  }
  setKochavaId(id) {
    if (this.config.isDebug)
      return this.logger("setKochavaId", id);
  }
  setAdjustId(id) {
    if (this.config.isDebug)
      return this.logger("setAdjustId", id);
  }
  setStaticCommonProperties(properties) {
    if (this.config.isDebug)
      return this.logger("setStaticCommonProperties", properties);
  }
  clearStaticCommonProperties() {
    if (this.config.isDebug)
      return this.logger("clearStaticCommonProperties");
  }
  setCommonProperties(callback) {
    if (this.config.isDebug)
      return this.logger("setCommonProperties", callback);
  }
  clearCommonProperties() {
    if (this.config.isDebug)
      return this.logger("clearCommonProperties");
  }
};

// src/sandbox/shim/MiniShim.ts
var MiniShim = class {
  constructor(platform) {
    this.platform = platform;
    switch (platform) {
      case 100 /* WECHAT */:
      case 200 /* WECHAT */:
        this.api = wx;
        break;
      case 101 /* QQ */:
      case 201 /* QQ */:
        this.api = qq;
        break;
      case 102 /* BAIDU */:
      case 202 /* BAIDU */:
        this.api = swan;
        break;
      case 103 /* TOUTIAO */:
      case 203 /* TOUTIAO */:
        this.api = tt;
        break;
      case 104 /* ALIPAY */:
      case 204 /* ALIPAY */:
      case 108 /* TAOBAO */:
        this.api = my;
        break;
      case 105 /* DINGDING */:
        this.api = dd;
        break;
      case 106 /* KUAISHOU */:
        this.api = ks;
        break;
      case 107 /* QIHOO */:
      case 206 /* QIHOO */:
        this.api = qh;
        break;
      case 109 /* JINGDONG */:
        this.api = jd;
        break;
      case 205 /* BILIBILI */:
        this.api = bl;
      default:
        throw new Error("Unsupported platform");
    }
  }
  getStorage(key) {
    return new Promise((success, fail) => {
      this.api.getStorage({ key, success, fail }).then((data) => JSON.parse(data || "null"));
    });
  }
  setStorage(key, value) {
    const data = JSON.stringify(value);
    return new Promise((success, fail) => {
      this.api.setStorage({ key, data, success, fail });
    });
  }
  removeStorage(name) {
    return new Promise((success, fail) => {
      this.api.removeStorage({ key: name, success, fail });
    });
  }
  request(options) {
    return new Promise((success, fail) => {
      const { header, params, data, method, timeout } = options;
      const query = params ? "?" + new URLSearchParams(params).toString() : "";
      const url = options.url + query;
      const opts = { url, data, method, timeout, success, fail };
      switch (this.platform) {
        case 108 /* TAOBAO */:
          const res = this.api.tb.request({
            url,
            method,
            options: JSON.stringify({ timeout }),
            headers: JSON.stringify(header),
            body: JSON.stringify(data)
          });
          success(res);
          break;
        case 204 /* ALIPAY */:
        case 104 /* ALIPAY */:
          this.api.httpRequest(__spreadProps(__spreadValues({}, opts), { headers: header }));
          break;
        case 105 /* DINGDING */:
          this.api.httpRequest(__spreadProps(__spreadValues({}, opts), { headers: header }));
          break;
        default:
          this.api.request(__spreadProps(__spreadValues({}, opts), { header }));
          break;
      }
    });
  }
  getNetworkStatus() {
  }
  onNetworkStatusChange(callback) {
  }
  getSystemInfo() {
  }
  getAppOptions() {
  }
  showToast(msg) {
  }
};

// src/sandbox/shim/QuickAppShim.ts
var QuickAppShim = class {
  constructor() {
  }
};

// src/sandbox/shim/QuickGameShim.ts
var QuickGameShim = class {
  constructor(platform) {
    this.platform = platform;
  }
};

// src/sandbox/shim/WebShim.ts
var WebShim = class {
};

// src/sandbox/index.ts
var Web = class extends DataTower {
};
Web.instance = new Sandbox(new WebShim());
var QuickApp = class extends DataTower {
};
QuickApp.instance = new Sandbox(new QuickAppShim());
var HuaweiQuickGame = class extends DataTower {
};
HuaweiQuickGame.instance = new Sandbox(new QuickGameShim(302 /* HUAWEI */));
var WechatMimiGame = class extends DataTower {
};
WechatMimiGame.instance = new Sandbox(new MiniShim(200 /* WECHAT */));

// src/cocos/Android.ts
var _Android = class _Android extends DataTower {
  constructor() {
    super(...arguments);
    this.config = DefaultConfig;
    this.dynamicPropertiesCallback = null;
  }
  callStaticMethod(method, signature, ...args) {
    return jsb.reflection.callStaticMethod(AndroidClass, method, generateSignature(signature), ...args);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod("initSDK", [["String"], "void"], fmt(this.config));
  }
  track(eventName, properties) {
    var _a;
    properties = __spreadValues(__spreadValues({}, properties), (_a = this.dynamicPropertiesCallback) == null ? void 0 : _a.call(this));
    this.callStaticMethod("track", [["String", "String"], "void"], eventName, fmt(properties));
  }
  enableUpload() {
    this.callStaticMethod("enableUpload", [[], "void"]);
  }
  userSet(properties) {
    this.callStaticMethod("userSet", [["String"], "void"], fmt(properties));
  }
  userSetOnce(properties) {
    this.callStaticMethod("userSetOnce", [["String"], "void"], fmt(properties));
  }
  userAdd(properties) {
    this.callStaticMethod("userAdd", [["String"], "void"], fmt(properties));
  }
  userUnset(properties) {
    this.callStaticMethod("userUnset", [["String"], "void"], fmt(properties));
  }
  userDelete() {
    this.callStaticMethod("userDelete", [[], "void"]);
  }
  userAppend(properties) {
    this.callStaticMethod("userAppend", [["String"], "void"], fmt(properties));
  }
  userUniqAppend(properties) {
    this.callStaticMethod("userUniqAppend", [["String"], "void"], fmt(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDataTowerId", [["String"], "void"], cb), callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDistinctId", [["String"], "void"], cb), callback);
  }
  setAccountId(id) {
    this.callStaticMethod("setAccountId", [["String"], "void"], id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId", [["String"], "void"], id);
  }
  setFirebaseAppInstanceId(id) {
    this.callStaticMethod("setFirebaseAppInstanceId", [["String"], "void"], id);
  }
  setAppsFlyerId(id) {
    this.callStaticMethod("setAppsFlyerId", [["String"], "void"], id);
  }
  setKochavaId(id) {
    this.callStaticMethod("setKochavaId", [["String"], "void"], id);
  }
  setAdjustId(id) {
    this.callStaticMethod("setAdjustId", [["String"], "void"], id);
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties", [["String"], "void"], fmt(properties));
  }
  clearStaticCommonProperties() {
    this.callStaticMethod("clearStaticCommonProperties", [[], "void"]);
  }
  setCommonProperties(callback) {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties() {
    this.dynamicPropertiesCallback = null;
  }
};
_Android.instance = new _Android();
var Android = _Android;
var Android_default = Android;

// src/cocos/IOS.ts
var _IOS = class _IOS extends DataTower {
  constructor() {
    super(...arguments);
    this.config = DefaultConfig;
    this.dynamicPropertiesCallback = null;
  }
  callStaticMethod(method, ...args) {
    return jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod("initSDK:", fmt(this.config));
  }
  track(eventName, properties) {
    var _a;
    properties = __spreadValues(__spreadValues({}, properties), (_a = this.dynamicPropertiesCallback) == null ? void 0 : _a.call(this));
    this.callStaticMethod("track:properties:", eventName, fmt(properties));
  }
  enableUpload() {
    this.callStaticMethod("enableUpload");
  }
  userSet(properties) {
    this.callStaticMethod("userSet:", fmt(properties));
  }
  userSetOnce(properties) {
    this.callStaticMethod("userSetOnce:", fmt(properties));
  }
  userAdd(properties) {
    this.callStaticMethod("userAdd:", fmt(properties));
  }
  userUnset(properties) {
    this.callStaticMethod("userUnset:", fmt(properties));
  }
  userDelete() {
    this.callStaticMethod("userDelete");
  }
  userAppend(properties) {
    this.callStaticMethod("userAppend:", fmt(properties));
  }
  userUniqAppend(properties) {
    this.callStaticMethod("userUniqAppend:", fmt(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDataTowerId:", cb), callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDistinctId:", cb), callback);
  }
  setAccountId(id) {
    this.callStaticMethod("setAccountId:", id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId:", id);
  }
  setFirebaseAppInstanceId(id) {
    this.callStaticMethod("setFirebaseAppInstanceId:", id);
  }
  setAppsFlyerId(id) {
    this.callStaticMethod("setAppsFlyerId:", id);
  }
  setKochavaId(id) {
    this.callStaticMethod("setKochavaId:", id);
  }
  setAdjustId(id) {
    this.callStaticMethod("setAdjustId:", id);
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties:", fmt(properties));
  }
  clearStaticCommonProperties() {
    this.callStaticMethod("clearStaticCommonProperties");
  }
  setCommonProperties(callback) {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties() {
    this.dynamicPropertiesCallback = null;
  }
};
_IOS.instance = new _IOS();
var IOS = _IOS;
var IOS_default = IOS;

// src/cocos/index.ts
var Cocos = {
  [cc.sys.Platform.ANDROID]: Android_default,
  [cc.sys.Platform.IOS]: IOS_default
}[cc.sys.platform] || Web;
var cocos_default = Cocos;

export { Cocos as DataTower, LogLevel, cocos_default as default };
