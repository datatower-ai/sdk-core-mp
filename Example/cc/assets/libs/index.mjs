var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/Web/index.ts
var Web_exports = {};
__export(Web_exports, {
  clearCommonProperties: () => clearCommonProperties,
  clearStaticCommonProperties: () => clearStaticCommonProperties,
  enableTrack: () => enableTrack,
  getDataTowerId: () => getDataTowerId,
  getDistinctId: () => getDistinctId,
  init: () => init,
  setAccountId: () => setAccountId,
  setAdjustId: () => setAdjustId,
  setAppsFlyerId: () => setAppsFlyerId,
  setCommonProperties: () => setCommonProperties,
  setDistinctId: () => setDistinctId,
  setFirebaseAppInstanceId: () => setFirebaseAppInstanceId,
  setKochavaId: () => setKochavaId,
  setStaticCommonProperties: () => setStaticCommonProperties,
  track: () => track,
  userAdd: () => userAdd,
  userAppend: () => userAppend,
  userDel: () => userDel,
  userSet: () => userSet,
  userSetOnce: () => userSetOnce,
  userUniqAppend: () => userUniqAppend,
  userUnset: () => userUnset
});

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
function logger(...args) {
  console.log("[DataTower SDK]:", ...args);
}

// src/Web/index.ts
var CurrentPlatform = new Proxy(
  {},
  {
    get(target, key) {
      return (...args) => console.log(`${key}(${args.join(", ")})`);
    }
  }
);
function init(config) {
  if (config.isDebug)
    return logger("Web", "init", config);
  CurrentPlatform.init(config);
}
function track(eventName, properties) {
  CurrentPlatform.track(eventName, properties);
}
function enableTrack() {
  CurrentPlatform.enableTrack();
}
function userSet(properties) {
  CurrentPlatform.userSet(properties);
}
function userSetOnce(properties) {
  CurrentPlatform.userSetOnce(properties);
}
function userAdd(properties) {
  CurrentPlatform.userAdd(properties);
}
function userUnset(...properties) {
  CurrentPlatform.userUnset(...properties);
}
function userDel() {
  CurrentPlatform.userDel();
}
function userAppend(...properties) {
  CurrentPlatform.userAppend(...properties);
}
function userUniqAppend(...properties) {
  CurrentPlatform.userUniqAppend(...properties);
}
function getDataTowerId(callback) {
  if (!callback)
    return Promise.resolve("data tower id");
  callback("data tower id");
}
function setAccountId(id) {
  CurrentPlatform.setAccountId(id);
}
function setDistinctId(id) {
  CurrentPlatform.setDistinctId(id);
}
function getDistinctId() {
  return CurrentPlatform.getDistinctId();
}
function setFirebaseAppInstanceId(id) {
  CurrentPlatform.setFirebaseAppInstanceId(id);
}
function setAppsFlyerId(id) {
  CurrentPlatform.setAppsFlyerId(id);
}
function setKochavaId(id) {
  CurrentPlatform.setKochavaId(id);
}
function setAdjustId(id) {
  CurrentPlatform.setAdjustId(id);
}
function setCommonProperties(properties) {
  CurrentPlatform.setCommonProperties(properties);
}
function clearCommonProperties() {
  CurrentPlatform.clearCommonProperties();
}
function setStaticCommonProperties(properties) {
  CurrentPlatform.setStaticCommonProperties(properties);
}
function clearStaticCommonProperties() {
  CurrentPlatform.clearStaticCommonProperties();
}

// src/CocosCreator/Android.ts
var Android_exports = {};
__export(Android_exports, {
  clearCommonProperties: () => clearCommonProperties2,
  clearStaticCommonProperties: () => clearStaticCommonProperties2,
  enableTrack: () => enableTrack2,
  getDataTowerId: () => getDataTowerId2,
  getDistinctId: () => getDistinctId2,
  init: () => init2,
  setAccountId: () => setAccountId2,
  setAdjustId: () => setAdjustId2,
  setAppsFlyerId: () => setAppsFlyerId2,
  setCommonProperties: () => setCommonProperties2,
  setDistinctId: () => setDistinctId2,
  setFirebaseAppInstanceId: () => setFirebaseAppInstanceId2,
  setKochavaId: () => setKochavaId2,
  setStaticCommonProperties: () => setStaticCommonProperties2,
  track: () => track2,
  userAdd: () => userAdd2,
  userAppend: () => userAppend2,
  userDel: () => userDel2,
  userSet: () => userSet2,
  userSetOnce: () => userSetOnce2,
  userUniqAppend: () => userUniqAppend2,
  userUnset: () => userUnset2
});

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

// src/CocosCreator/Android.ts
function init2(config) {
  config = Object.assign({}, DefaultConfig, config);
  if (config.isDebug)
    return logger("Android", "init", config);
  jsb.reflection.callStaticMethod(AndroidClass, "initSDK", generateSignature(["map"]), config);
}
function track2(eventName, properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "track", generateSignature(["string", "map"]), eventName, properties);
}
function enableTrack2() {
  jsb.reflection.callStaticMethod(AndroidClass, "enableTrack");
}
function userSet2(properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userSet", generateSignature(["map"]), properties);
}
function userSetOnce2(properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userSetOnce", generateSignature(["map"]), properties);
}
function userAdd2(properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userAdd", generateSignature(["map"]), properties);
}
function userUnset2(...properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userUnset", generateSignature(["array"]), properties);
}
function userDel2() {
  jsb.reflection.callStaticMethod(AndroidClass, "userDel");
}
function userAppend2(...properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userAppend", generateSignature(["array"]), properties);
}
function userUniqAppend2(...properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "userUniqAppend", generateSignature(["array"]), properties);
}
function getDataTowerId2(callback) {
  if (!callback)
    return new Promise((resolve) => getDataTowerId2(resolve));
  jsb.reflection.callStaticMethod(AndroidClass, "getDataTowerId", generateSignature(["string"]), callback);
}
function setAccountId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setAccountId", generateSignature(["string"]), id);
}
function setDistinctId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setDistinctId", generateSignature(["string"]), id);
}
function getDistinctId2() {
  jsb.reflection.callStaticMethod(AndroidClass, "getDistinctId");
}
function setFirebaseAppInstanceId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setFirebaseAppInstanceId", generateSignature(["string"]), id);
}
function setAppsFlyerId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setAppsFlyerId", generateSignature(["string"]), id);
}
function setKochavaId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setKochavaId", generateSignature(["string"]), id);
}
function setAdjustId2(id) {
  jsb.reflection.callStaticMethod(AndroidClass, "setAdjustId", generateSignature(["string"]), id);
}
function setCommonProperties2(properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "setCommonProperties", generateSignature(["map"]), properties);
}
function clearCommonProperties2() {
  jsb.reflection.callStaticMethod(AndroidClass, "clearCommonProperties");
}
function setStaticCommonProperties2(properties) {
  jsb.reflection.callStaticMethod(AndroidClass, "setStaticCommonProperties", generateSignature(["map"]), properties);
}
function clearStaticCommonProperties2() {
  jsb.reflection.callStaticMethod(AndroidClass, "clearStaticCommonProperties");
}

// src/CocosCreator/IOS.ts
var IOS_exports = {};
__export(IOS_exports, {
  clearCommonProperties: () => clearCommonProperties3,
  clearStaticCommonProperties: () => clearStaticCommonProperties3,
  enableTrack: () => enableTrack3,
  getDataTowerId: () => getDataTowerId3,
  getDistinctId: () => getDistinctId3,
  init: () => init3,
  setAccountId: () => setAccountId3,
  setAdjustId: () => setAdjustId3,
  setAppsFlyerId: () => setAppsFlyerId3,
  setCommonProperties: () => setCommonProperties3,
  setDistinctId: () => setDistinctId3,
  setFirebaseAppInstanceId: () => setFirebaseAppInstanceId3,
  setKochavaId: () => setKochavaId3,
  setStaticCommonProperties: () => setStaticCommonProperties3,
  track: () => track3,
  userAdd: () => userAdd3,
  userAppend: () => userAppend3,
  userDel: () => userDel3,
  userSet: () => userSet3,
  userSetOnce: () => userSetOnce3,
  userUniqAppend: () => userUniqAppend3,
  userUnset: () => userUnset3
});
function init3(config) {
  config = Object.assign({}, DefaultConfig, config);
  if (config.isDebug)
    return logger("IOS", "init", config);
  jsb.reflection.callStaticMethod(IOSClass, "initSDK:", config);
}
function track3(eventName, properties) {
  jsb.reflection.callStaticMethod(IOSClass, "track:properties:", eventName, properties);
}
function enableTrack3() {
  jsb.reflection.callStaticMethod(IOSClass, "enableTrack");
}
function userSet3(properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userSet:", properties);
}
function userSetOnce3(properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userSetOnce:", properties);
}
function userAdd3(properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userAdd:", properties);
}
function userUnset3(...properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userUnset:", properties);
}
function userDel3() {
  jsb.reflection.callStaticMethod(IOSClass, "userDel");
}
function userAppend3(...properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userAppend:", properties);
}
function userUniqAppend3(...properties) {
  jsb.reflection.callStaticMethod(IOSClass, "userUniqAppend:", properties);
}
function getDataTowerId3(callback) {
  if (!callback)
    return new Promise((resolve) => getDataTowerId3(resolve));
  jsb.reflection.callStaticMethod(IOSClass, "getDataTowerId:", callback);
}
function setAccountId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setAccountId:", id);
}
function setDistinctId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setDistinctId:", id);
}
function getDistinctId3() {
  jsb.reflection.callStaticMethod(IOSClass, "getDistinctId");
}
function setFirebaseAppInstanceId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setFirebaseAppInstanceId:", id);
}
function setAppsFlyerId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setAppsFlyerId:", id);
}
function setKochavaId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setKochavaId:", id);
}
function setAdjustId3(id) {
  jsb.reflection.callStaticMethod(IOSClass, "setAdjustId:", id);
}
function setCommonProperties3(properties) {
  jsb.reflection.callStaticMethod(IOSClass, "setCommonProperties:", properties);
}
function clearCommonProperties3() {
  jsb.reflection.callStaticMethod(IOSClass, "clearCommonProperties");
}
function setStaticCommonProperties3(properties) {
  jsb.reflection.callStaticMethod(IOSClass, "setStaticCommonProperties:", properties);
}
function clearStaticCommonProperties3() {
  jsb.reflection.callStaticMethod(IOSClass, "clearStaticCommonProperties");
}

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

// src/CocosCreator/index.ts
var SupportPlatforms = [
  [cc.sys.isNativeAndroid, Android_exports],
  [cc.sys.isNativeIOS, IOS_exports],
  [true, Web_exports]
];
var CurrentPlatform2 = SupportPlatforms.find((item) => item[0])[1];
function init4(config) {
  CurrentPlatform2.init(config);
}
function track4(eventName, properties) {
  CurrentPlatform2.track(eventName, properties);
}
function enableTrack4() {
  CurrentPlatform2.enableTrack();
}
function userSet4(properties) {
  CurrentPlatform2.userSet(properties);
}
function userSetOnce4(properties) {
  CurrentPlatform2.userSetOnce(properties);
}
function userAdd4(properties) {
  CurrentPlatform2.userAdd(properties);
}
function userUnset4(...properties) {
  CurrentPlatform2.userUnset(...properties);
}
function userDel4() {
  CurrentPlatform2.userDel();
}
function userAppend4(...properties) {
  CurrentPlatform2.userAppend(...properties);
}
function userUniqAppend4(...properties) {
  CurrentPlatform2.userUniqAppend(...properties);
}
function getDataTowerId4(callback) {
  return CurrentPlatform2.getDataTowerId(callback);
}
function setAccountId4(id) {
  CurrentPlatform2.setAccountId(id);
}
function setDistinctId4(id) {
  CurrentPlatform2.setDistinctId(id);
}
function getDistinctId4() {
  return CurrentPlatform2.getDistinctId();
}
function setFirebaseAppInstanceId4(id) {
  CurrentPlatform2.setFirebaseAppInstanceId(id);
}
function setAppsFlyerId4(id) {
  CurrentPlatform2.setAppsFlyerId(id);
}
function setKochavaId4(id) {
  CurrentPlatform2.setKochavaId(id);
}
function setAdjustId4(id) {
  CurrentPlatform2.setAdjustId(id);
}
function setCommonProperties4(properties) {
  CurrentPlatform2.setCommonProperties(properties);
}
function clearCommonProperties4() {
  CurrentPlatform2.clearCommonProperties();
}
function setStaticCommonProperties4(properties) {
  CurrentPlatform2.setStaticCommonProperties(properties);
}
function clearStaticCommonProperties4() {
  CurrentPlatform2.clearStaticCommonProperties();
}

export { LogLevel, clearCommonProperties4 as clearCommonProperties, clearStaticCommonProperties4 as clearStaticCommonProperties, enableTrack4 as enableTrack, getDataTowerId4 as getDataTowerId, getDistinctId4 as getDistinctId, init4 as init, setAccountId4 as setAccountId, setAdjustId4 as setAdjustId, setAppsFlyerId4 as setAppsFlyerId, setCommonProperties4 as setCommonProperties, setDistinctId4 as setDistinctId, setFirebaseAppInstanceId4 as setFirebaseAppInstanceId, setKochavaId4 as setKochavaId, setStaticCommonProperties4 as setStaticCommonProperties, track4 as track, userAdd4 as userAdd, userAppend4 as userAppend, userDel4 as userDel, userSet4 as userSet, userSetOnce4 as userSetOnce, userUniqAppend4 as userUniqAppend, userUnset4 as userUnset };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map