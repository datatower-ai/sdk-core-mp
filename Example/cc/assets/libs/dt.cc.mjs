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
  static enableTrack() {
    return this.instance.enableTrack();
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
  static userUnset(...properties) {
    return this.instance.userUnset(...properties);
  }
  static userDel() {
    return this.instance.userDel();
  }
  static userAppend(...properties) {
    return this.instance.userAppend(...properties);
  }
  static userUniqAppend(...properties) {
    return this.instance.userUniqAppend(...properties);
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
  static getDistinctId() {
    return this.instance.getDistinctId();
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
  context: {},
  appId: "",
  serverUrl: "",
  channel: "",
  isDebug: true,
  logLevel: 1,
  manualEnableUpload: false,
  commonProperties: {}
};
var AndroidClass = "com/ai/datatower/DTCocosCreatorProxyApi";
var IOSClass = "DTCocosCreatorProxyApi";

// src/utils.ts
var typeMap = {
  string: "Ljava/lang/String;",
  number: "Ljava/lang/Double;",
  boolean: "Ljava/lang/Boolean;",
  map: "Ljava/util/Map;",
  array: "Ljava/util/List;"
};
function generateSignature(types) {
  return `(${types.map((type) => typeMap[type]).join("")})V`;
}
function format(obj) {
  return obj && JSON.stringify(obj);
}
function logger(...args) {
  console.log("[DataTower SDK]", ...args);
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
  enableTrack() {
    if (this.config.isDebug)
      return this.logger("enableTrack");
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
  userUnset(...properties) {
    if (this.config.isDebug)
      return this.logger("userUnset", properties);
  }
  userDel() {
    if (this.config.isDebug)
      return this.logger("userDel");
  }
  userAppend(...properties) {
    if (this.config.isDebug)
      return this.logger("userAppend", properties);
  }
  userUniqAppend(...properties) {
    if (this.config.isDebug)
      return this.logger("userUniqAppend", properties);
  }
  getDataTowerId(callback) {
    if (!callback) {
      if (this.config.isDebug)
        return this.logger("getDataTowerId");
      return new Promise((resolve) => this.getDataTowerId(resolve));
    }
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
  getDistinctId() {
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
    const params = signature ? [generateSignature(signature), ...args] : [];
    return jsb.reflection.callStaticMethod(AndroidClass, method, ...params);
  }
  init(config) {
    this.config = Object.assign({}, DefaultConfig, config);
    this.callStaticMethod("initSDK", ["map"], format(this.config));
  }
  track(eventName, properties) {
    this.callStaticMethod("track", ["string", "map"], eventName, format(properties));
  }
  enableTrack() {
    this.callStaticMethod("enableTrack");
  }
  userSet(properties) {
    this.callStaticMethod("userSet", ["map"], format(properties));
  }
  userSetOnce(properties) {
    this.callStaticMethod("userSetOnce", ["map"], format(properties));
  }
  userAdd(properties) {
    this.callStaticMethod("userAdd", ["map"], format(properties));
  }
  userUnset(...properties) {
    this.callStaticMethod("userUnset", ["array"], format(properties));
  }
  userDel() {
    this.callStaticMethod("userDel");
  }
  userAppend(...properties) {
    this.callStaticMethod("userAppend", ["array"], format(properties));
  }
  userUniqAppend(...properties) {
    this.callStaticMethod("userUniqAppend", ["array"], format(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    this.callStaticMethod("getDataTowerId", ["string"], callback);
  }
  setAccountId(id) {
    this.callStaticMethod("setAccountId", ["string"], id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId", ["string"], id);
  }
  getDistinctId() {
    this.callStaticMethod("getDistinctId");
  }
  setFirebaseAppInstanceId(id) {
    this.callStaticMethod("setFirebaseAppInstanceId", ["string"], id);
  }
  setAppsFlyerId(id) {
    this.callStaticMethod("setAppsFlyerId", ["string"], id);
  }
  setKochavaId(id) {
    this.callStaticMethod("setKochavaId", ["string"], id);
  }
  setAdjustId(id) {
    this.callStaticMethod("setAdjustId", ["string"], id);
  }
  setCommonProperties(properties) {
    this.callStaticMethod("setCommonProperties", ["map"], format(properties));
  }
  clearCommonProperties() {
    this.callStaticMethod("clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties", ["map"], format(properties));
  }
  clearStaticCommonProperties() {
    this.callStaticMethod("clearStaticCommonProperties");
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
    this.callStaticMethod("initSDK:", format(this.config));
  }
  track(eventName, properties) {
    this.callStaticMethod("track:properties:", eventName, format(properties));
  }
  enableTrack() {
    this.callStaticMethod("enableTrack");
  }
  userSet(properties) {
    this.callStaticMethod("userSet:", format(properties));
  }
  userSetOnce(properties) {
    this.callStaticMethod("userSetOnce:", format(properties));
  }
  userAdd(properties) {
    this.callStaticMethod("userAdd:", format(properties));
  }
  userUnset(...properties) {
    this.callStaticMethod("userUnset:", format(properties));
  }
  userDel() {
    this.callStaticMethod("userDel");
  }
  userAppend(...properties) {
    this.callStaticMethod("userAppend:", format(properties));
  }
  userUniqAppend(...properties) {
    this.callStaticMethod("userUniqAppend:", format(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    this.callStaticMethod("getDataTowerId:", callback);
  }
  setAccountId(id) {
    this.callStaticMethod("setAccountId:", id);
  }
  setDistinctId(id) {
    this.callStaticMethod("setDistinctId:", id);
  }
  getDistinctId() {
    this.callStaticMethod("getDistinctId");
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
    this.callStaticMethod("setCommonProperties:", format(properties));
  }
  clearCommonProperties() {
    this.callStaticMethod("clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    this.callStaticMethod("setStaticCommonProperties:", format(properties));
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
