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
var DataTower = class _DataTower {
  static init(config) {
    return _DataTower.instance.init(config);
  }
  static enableTrack() {
    return _DataTower.instance.enableTrack();
  }
  static track(eventName, properties) {
    return _DataTower.instance.track(eventName, properties);
  }
  static userSet(properties) {
    return _DataTower.instance.userSet(properties);
  }
  static userSetOnce(properties) {
    return _DataTower.instance.userSetOnce(properties);
  }
  static userAdd(properties) {
    return _DataTower.instance.userAdd(properties);
  }
  static userUnset(...properties) {
    return _DataTower.instance.userUnset(...properties);
  }
  static userDel() {
    return _DataTower.instance.userDel();
  }
  static userAppend(...properties) {
    return _DataTower.instance.userAppend(...properties);
  }
  static userUniqAppend(...properties) {
    return _DataTower.instance.userUniqAppend(...properties);
  }
  static getDataTowerId(callback) {
    return _DataTower.instance.getDataTowerId(callback);
  }
  static setAccountId(id) {
    return _DataTower.instance.setAccountId(id);
  }
  static setDistinctId(id) {
    return _DataTower.instance.setDistinctId(id);
  }
  static getDistinctId() {
    return _DataTower.instance.getDistinctId();
  }
  static setFirebaseAppInstanceId(id) {
    return _DataTower.instance.setFirebaseAppInstanceId(id);
  }
  static setAppsFlyerId(id) {
    return _DataTower.instance.setAppsFlyerId(id);
  }
  static setKochavaId(id) {
    return _DataTower.instance.setKochavaId(id);
  }
  static setAdjustId(id) {
    return _DataTower.instance.setAdjustId(id);
  }
  static setCommonProperties(properties) {
    return _DataTower.instance.setCommonProperties(properties);
  }
  static clearCommonProperties() {
    return _DataTower.instance.clearCommonProperties();
  }
  static setStaticCommonProperties(properties) {
    return _DataTower.instance.setStaticCommonProperties(properties);
  }
  static clearStaticCommonProperties() {
    return _DataTower.instance.clearStaticCommonProperties();
  }
};

// src/constant.ts
var DefaultConfig = {
  context: {},
  appId: "",
  serverUrl: "",
  channel: "",
  isDebug: false,
  logLevel: 1,
  manualEnableUpload: false,
  commonProperties: {}
};
var AndroidClass = "ai/datatower/analytics/DT";
var IOSClass = "DT";

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
  console.log("[DataTower SDK]:", ...args);
}

// src/Web/index.ts
var CurrentPlatform = new Proxy(
  {},
  {
    get(target, key) {
      return (...args) => {
        const params = args.map((arg) => typeof arg === "function" ? arg.toString() : JSON.stringify(arg)).join(", ");
        console.log(`${key}(${params})`);
      };
    }
  }
);
var Web = class extends DataTower {
  constructor(config) {
    super();
    if (config)
      this.init(config);
  }
  init(config) {
    config = Object.assign({}, DefaultConfig, config);
    if (config.isDebug)
      return logger("Web", "init", config);
    CurrentPlatform.init(config);
  }
  track(eventName, properties) {
    CurrentPlatform.track(eventName, properties);
  }
  enableTrack() {
    CurrentPlatform.enableTrack();
  }
  userSet(properties) {
    CurrentPlatform.userSet(properties);
  }
  userSetOnce(properties) {
    CurrentPlatform.userSetOnce(properties);
  }
  userAdd(properties) {
    CurrentPlatform.userAdd(properties);
  }
  userUnset(...properties) {
    CurrentPlatform.userUnset(...properties);
  }
  userDel() {
    CurrentPlatform.userDel();
  }
  userAppend(...properties) {
    CurrentPlatform.userAppend(...properties);
  }
  userUniqAppend(...properties) {
    CurrentPlatform.userUniqAppend(...properties);
  }
  getDataTowerId(callback) {
    CurrentPlatform.getDataTowerId(callback);
    if (!callback)
      return Promise.resolve("data tower id");
    callback("data tower id");
  }
  setAccountId(id) {
    CurrentPlatform.setAccountId(id);
  }
  setDistinctId(id) {
    CurrentPlatform.setDistinctId(id);
  }
  getDistinctId() {
    return CurrentPlatform.getDistinctId();
  }
  setFirebaseAppInstanceId(id) {
    CurrentPlatform.setFirebaseAppInstanceId(id);
  }
  setAppsFlyerId(id) {
    CurrentPlatform.setAppsFlyerId(id);
  }
  setKochavaId(id) {
    CurrentPlatform.setKochavaId(id);
  }
  setAdjustId(id) {
    CurrentPlatform.setAdjustId(id);
  }
  setCommonProperties(properties) {
    CurrentPlatform.setCommonProperties(properties);
  }
  clearCommonProperties() {
    CurrentPlatform.clearCommonProperties();
  }
  setStaticCommonProperties(properties) {
    CurrentPlatform.setStaticCommonProperties(properties);
  }
  clearStaticCommonProperties() {
    CurrentPlatform.clearStaticCommonProperties();
  }
};
DataTower.instance = new Web();
var Web_default = Web;

// src/CocosCreator/Android.ts
var Android = class extends DataTower {
  constructor(config) {
    super();
    if (config)
      this.init(config);
  }
  init(config) {
    config = Object.assign({}, DefaultConfig, config);
    if (config.isDebug)
      return logger("Android", "init", config);
    jsb.reflection.callStaticMethod(AndroidClass, "initSDK", generateSignature(["map"]), format(config));
  }
  track(eventName, properties) {
    jsb.reflection.callStaticMethod(
      AndroidClass,
      "track",
      generateSignature(["string", "map"]),
      eventName,
      format(properties)
    );
  }
  enableTrack() {
    jsb.reflection.callStaticMethod(AndroidClass, "enableTrack");
  }
  userSet(properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userSet", generateSignature(["map"]), format(properties));
  }
  userSetOnce(properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userSetOnce", generateSignature(["map"]), format(properties));
  }
  userAdd(properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userAdd", generateSignature(["map"]), format(properties));
  }
  userUnset(...properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userUnset", generateSignature(["array"]), format(properties));
  }
  userDel() {
    jsb.reflection.callStaticMethod(AndroidClass, "userDel");
  }
  userAppend(...properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userAppend", generateSignature(["array"]), format(properties));
  }
  userUniqAppend(...properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "userUniqAppend", generateSignature(["array"]), format(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    jsb.reflection.callStaticMethod(AndroidClass, "getDataTowerId", generateSignature(["string"]), callback);
  }
  setAccountId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setAccountId", generateSignature(["string"]), id);
  }
  setDistinctId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setDistinctId", generateSignature(["string"]), id);
  }
  getDistinctId() {
    jsb.reflection.callStaticMethod(AndroidClass, "getDistinctId");
  }
  setFirebaseAppInstanceId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setFirebaseAppInstanceId", generateSignature(["string"]), id);
  }
  setAppsFlyerId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setAppsFlyerId", generateSignature(["string"]), id);
  }
  setKochavaId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setKochavaId", generateSignature(["string"]), id);
  }
  setAdjustId(id) {
    jsb.reflection.callStaticMethod(AndroidClass, "setAdjustId", generateSignature(["string"]), id);
  }
  setCommonProperties(properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "setCommonProperties", generateSignature(["map"]), format(properties));
  }
  clearCommonProperties() {
    jsb.reflection.callStaticMethod(AndroidClass, "clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    jsb.reflection.callStaticMethod(AndroidClass, "setStaticCommonProperties", generateSignature(["map"]), format(properties));
  }
  clearStaticCommonProperties() {
    jsb.reflection.callStaticMethod(AndroidClass, "clearStaticCommonProperties");
  }
};
DataTower.instance = new Android();
var Android_default = Android;

// src/CocosCreator/IOS.ts
var IOS = class extends DataTower {
  constructor(config) {
    super();
    if (config)
      this.init(config);
  }
  init(config) {
    config = Object.assign({}, DefaultConfig, config);
    if (config.isDebug)
      return logger("IOS", "init", config);
    jsb.reflection.callStaticMethod(IOSClass, "initSDK:", config);
  }
  track(eventName, properties) {
    jsb.reflection.callStaticMethod(IOSClass, "track:properties:", eventName, format(properties));
  }
  enableTrack() {
    jsb.reflection.callStaticMethod(IOSClass, "enableTrack");
  }
  userSet(properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userSet:", format(properties));
  }
  userSetOnce(properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userSetOnce:", format(properties));
  }
  userAdd(properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userAdd:", format(properties));
  }
  userUnset(...properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userUnset:", format(properties));
  }
  userDel() {
    jsb.reflection.callStaticMethod(IOSClass, "userDel");
  }
  userAppend(...properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userAppend:", format(properties));
  }
  userUniqAppend(...properties) {
    jsb.reflection.callStaticMethod(IOSClass, "userUniqAppend:", format(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    jsb.reflection.callStaticMethod(IOSClass, "getDataTowerId:", callback);
  }
  setAccountId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setAccountId:", id);
  }
  setDistinctId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setDistinctId:", id);
  }
  getDistinctId() {
    jsb.reflection.callStaticMethod(IOSClass, "getDistinctId");
  }
  setFirebaseAppInstanceId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setFirebaseAppInstanceId:", id);
  }
  setAppsFlyerId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setAppsFlyerId:", id);
  }
  setKochavaId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setKochavaId:", id);
  }
  setAdjustId(id) {
    jsb.reflection.callStaticMethod(IOSClass, "setAdjustId:", id);
  }
  setCommonProperties(properties) {
    jsb.reflection.callStaticMethod(IOSClass, "setCommonProperties:", format(properties));
  }
  clearCommonProperties() {
    jsb.reflection.callStaticMethod(IOSClass, "clearCommonProperties");
  }
  setStaticCommonProperties(properties) {
    jsb.reflection.callStaticMethod(IOSClass, "setStaticCommonProperties:", format(properties));
  }
  clearStaticCommonProperties() {
    jsb.reflection.callStaticMethod(IOSClass, "clearStaticCommonProperties");
  }
};
DataTower.instance = new IOS();
var IOS_default = IOS;

// src/CocosCreator/index.ts
var CocosCreator = [
  [cc.sys.platform == cc.sys.Platform.ANDROID, Android_default],
  [cc.sys.platform == cc.sys.Platform.IOS, IOS_default],
  [true, Web_default]
].find((item) => item[0])[1];
DataTower.instance = new CocosCreator();
var CocosCreator_default = CocosCreator;

export { CocosCreator as DataTower, LogLevel, CocosCreator_default as default };
