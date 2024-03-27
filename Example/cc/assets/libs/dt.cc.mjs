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
  static setAccountId(id) {
    return this.instance.setAccountId(id);
  }
  static setDistinctId(id) {
    return this.instance.setDistinctId(id);
  }
  static getDistinctId(callback) {
    return this.instance.getDistinctId(callback);
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
  static setCommonProperties(properties) {
    return this.instance.setCommonProperties(properties);
  }
  static clearCommonProperties() {
    return this.instance.clearCommonProperties();
  }
  static setStaticCommonProperties(properties) {
    return this.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties() {
    return this.instance.clearStaticCommonProperties();
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
  commonProperties: void 0
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

// src/Web/index.ts
var _Web = class _Web extends DataTower {
  constructor(config) {
    super();
    this.config = DefaultConfig;
    if (config)
      this.init(config);
  }
  logger(method, ...args) {
    logger("<Web>", method, args);
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
  setAccountId(id) {
    if (this.config.isDebug)
      return this.logger("setAccountId", id);
  }
  setDistinctId(id) {
    if (this.config.isDebug)
      return this.logger("setDistinctId", id);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    if (this.config.isDebug)
      return this.logger("getDistinctId");
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
  setCommonProperties(properties) {
    if (this.config.isDebug)
      return this.logger("setCommonProperties", properties);
  }
  clearCommonProperties() {
    if (this.config.isDebug)
      return this.logger("clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    if (this.config.isDebug)
      return this.logger("setStaticCommonProperties", properties);
  }
  clearStaticCommonProperties() {
    if (this.config.isDebug)
      return this.logger("clearStaticCommonProperties");
  }
};
_Web.instance = new _Web();
var Web = _Web;
var Web_default = Web;

// src/CocosCreator/Android.ts
var _Android = class _Android extends DataTower {
  constructor(config) {
    super();
    this.config = DefaultConfig;
    if (config)
      this.init(config);
  }
  callStaticMethod(method, signature, ...args) {
    return jsb.reflection.callStaticMethod(AndroidClass, method, generateSignature(signature), ...args);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod("initSDK", [["String"], "void"], fmt(this.config));
  }
  track(eventName, properties) {
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
  setAccountId(id) {
    this.callStaticMethod("setAccountId", [["String"], "void"], id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId", [["String"], "void"], id);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDistinctId", [["String"], "void"], cb), callback);
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
  setCommonProperties(properties) {
    this.callStaticMethod("setCommonProperties", [["String"], "void"], fmt(properties));
  }
  clearCommonProperties() {
    this.callStaticMethod("clearCommonProperties", [[], "void"]);
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties", [["String"], "void"], fmt(properties));
  }
  clearStaticCommonProperties() {
    this.callStaticMethod("clearStaticCommonProperties", [[], "void"]);
  }
};
_Android.instance = new _Android();
var Android = _Android;
var Android_default = Android;

// src/CocosCreator/IOS.ts
var _IOS = class _IOS extends DataTower {
  constructor(config) {
    super();
    this.config = DefaultConfig;
    if (config)
      this.init(config);
  }
  callStaticMethod(method, ...args) {
    return jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod("initSDK:", fmt(this.config));
  }
  track(eventName, properties) {
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
  setAccountId(id) {
    this.callStaticMethod("setAccountId:", id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId:", id);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => this.callStaticMethod("getDistinctId:", cb), callback);
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
  setCommonProperties(properties) {
    this.callStaticMethod("setCommonProperties:", fmt(properties));
  }
  clearCommonProperties() {
    this.callStaticMethod("clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties:", fmt(properties));
  }
  clearStaticCommonProperties() {
    this.callStaticMethod("clearStaticCommonProperties");
  }
};
_IOS.instance = new _IOS();
var IOS = _IOS;
var IOS_default = IOS;

// src/CocosCreator/index.ts
var CocosCreator = [
  [cc.sys.platform == cc.sys.Platform.ANDROID, Android_default],
  [cc.sys.platform == cc.sys.Platform.IOS, IOS_default],
  [true, Web_default]
].find((item) => item[0])[1];
var CocosCreator_default = CocosCreator;

export { CocosCreator as DataTower, LogLevel, CocosCreator_default as default };
