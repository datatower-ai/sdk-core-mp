var __defProp = Object.defineProperty;
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

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

// src/StaticDataTower.ts
var StaticDataTower = class {
  static init(config) {
    return this.instance.init(config);
  }
  /**
   * manually start the report (if the manualEnableUpload is true)
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

// package.json
var version = "1.0.0";

// src/constant.ts
var DEFAULT_INITIAL_CONFIG = {
  appId: "",
  serverUrl: "",
  channel: "",
  isDebug: false,
  logLevel: 1 /* VERBOSE */,
  manualEnableUpload: false
};
var AndroidClass = "ai/datatower/bridge/DTCocosCreatorProxyApi";
var IOSClass = "DTCocosCreatorProxyApi";

// src/utils.ts
function fmt(obj) {
  return JSON.stringify(obj);
}
function globalNativeCallback(callNative, callback) {
  const callbackName = `__${Date.now()}__`;
  window[callbackName] = (arg) => {
    callback(arg);
    delete window[callbackName];
  };
  callNative(callbackName);
}
function debounce(callback, delay) {
  let timer = null;
  return function(...args) {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = null;
    }, delay);
  };
}

// src/sandbox/Logger.ts
var Logger = class {
  static verbose(...args) {
    if (this.level > 1 /* VERBOSE */)
      return;
    console.log("[VERBOSE]", ...args);
  }
  static assert(condition, ...args) {
    if (this.level > 2 /* ASSERT */)
      return;
    console.assert(condition, "[ASSERT]", ...args);
  }
  static debug(...args) {
    if (this.level > 3 /* DEBUG */)
      return;
    console.debug("[DEBUG]", ...args);
  }
  static info(...args) {
    if (this.level > 4 /* INFO */)
      return;
    console.info("[INFO]", ...args);
  }
  static warn(...args) {
    if (this.level > 5 /* WARN */)
      return;
    console.warn("[WARN]", ...args);
  }
  static error(...args) {
    if (this.level > 6 /* ERROR */)
      return;
    console.error("[ERROR]", ...args);
  }
};
Logger.level = 1 /* VERBOSE */;

// src/sandbox/TaskQueue.ts
var _TaskQueue = class _TaskQueue {
  constructor(maxSize = _TaskQueue.MAX_TASK_QUEUE_SIZE) {
    this.maxSize = maxSize;
    this.processing = false;
    this.queue = [];
  }
  get size() {
    return this.queue.length;
  }
  setMaxSize(size) {
    this.maxSize = size;
  }
  enqueue(task, ...tasks) {
    [task, ...tasks].forEach((task2) => {
      var _a, _b;
      this.queue.push(task2);
      (_a = this.onEnqueueCallback) == null ? void 0 : _a.call(this, task2);
      if (this.queue.length >= this.maxSize) {
        (_b = this.onMaxSizeCallback) == null ? void 0 : _b.call(this);
      }
    });
  }
  dequeue() {
    var _a;
    const task = this.queue.shift();
    if (!task)
      return;
    (_a = this.onDequeueCallback) == null ? void 0 : _a.call(this, task);
    return task;
  }
  onMaxSize(callback) {
    this.onMaxSizeCallback = callback;
  }
  onEnqueue(callback) {
    this.onEnqueueCallback = callback;
  }
  onDequeue(callback) {
    this.onDequeueCallback = callback;
  }
  onError(callback) {
    this.onErrorCallback = callback;
  }
  /**
   * execute all tasks at the same time, and clear the queue
   * don't call onDequeueCallback
   */
  flush() {
    let isAllSync = true;
    const tasks = this.queue.map((task) => {
      var _a;
      if (task instanceof Promise) {
        isAllSync = false;
        return task.catch((error) => {
          var _a2;
          return (_a2 = this.onErrorCallback) == null ? void 0 : _a2.call(this, task, error);
        });
      }
      try {
        return task();
      } catch (error) {
        (_a = this.onErrorCallback) == null ? void 0 : _a.call(this, task, error);
      }
    });
    this.queue = [];
    return isAllSync ? tasks : Promise.all(tasks);
  }
  /**
   * execute all tasks in order, and clear the queue
   * don't call onDequeueCallback
   */
  start() {
    return __async(this, null, function* () {
      if (this.processing)
        return;
      this.processing = true;
      yield this.startExecuteNext();
      this.processing = false;
    });
  }
  startExecuteNext() {
    return __async(this, null, function* () {
      var _a;
      if (this.queue.length === 0)
        return;
      const task = this.queue.shift();
      try {
        yield task();
      } catch (error) {
        (_a = this.onErrorCallback) == null ? void 0 : _a.call(this, task, error);
      }
      yield this.startExecuteNext();
    });
  }
  static tryExecute(tasks) {
    if (tasks.length === 0)
      return;
    try {
      const task = tasks[0]();
      if (task instanceof Promise) {
        return task.catch(() => {
          if (tasks.length === 1)
            return Promise.reject();
          return _TaskQueue.tryExecute(tasks.slice(1));
        });
      }
      return task;
    } catch (e) {
      if (tasks.length === 1)
        return;
      return _TaskQueue.tryExecute(tasks.slice(1));
    }
  }
  tryExecute() {
    return _TaskQueue.tryExecute(this.queue);
  }
};
_TaskQueue.MAX_TASK_QUEUE_SIZE = 10;
var TaskQueue = _TaskQueue;

// src/sandbox/Sandbox.ts
var Sandbox = class {
  constructor(shim) {
    this.shim = shim;
    this.config = DEFAULT_INITIAL_CONFIG;
    this.properties = { "#sdk_type": "js", "#sdk_version_name": version };
    this.dynamicPropertiesCallback = null;
    this.taskQueue = new TaskQueue();
  }
  init(config) {
    this.config = __spreadValues(__spreadValues({}, DEFAULT_INITIAL_CONFIG), config);
    Logger.level = this.config.logLevel;
    this.taskQueue.onMaxSize(() => this.enableUpload());
    if (this.config.manualEnableUpload)
      this.taskQueue.setMaxSize(Infinity);
    else
      this.taskQueue.onEnqueue(debounce(() => this.enableUpload(), 1e4));
    Logger.info("<call init>", config);
  }
  track(eventName, properties) {
    Logger.info("<call track>", eventName, properties);
    this.taskQueue.enqueue(() => {
      var _a;
      return __spreadValues(__spreadValues(__spreadValues({}, properties), this.properties), (_a = this.dynamicPropertiesCallback) == null ? void 0 : _a.call(this));
    });
  }
  enableUpload() {
    Logger.info("<call enableUpload>");
    this.shim.request({ url: this.config.serverUrl, data: this.taskQueue.flush() });
  }
  userSet(properties) {
    Logger.info("<call userSet>", properties);
  }
  userSetOnce(properties) {
    Logger.info("<call userSetOnce>", properties);
  }
  userAdd(properties) {
    Logger.info("<call userAdd>", properties);
  }
  userUnset(properties) {
    Logger.info("<call userUnset>", properties);
  }
  userDelete() {
    Logger.info("<call userDelete>");
  }
  userAppend(properties) {
    Logger.info("<call userAppend>", properties);
  }
  userUniqAppend(properties) {
    Logger.info("<call userUniqAppend>", properties);
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    Logger.info("<call getDataTowerId>", callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    Logger.info("<call getDistinctId>");
  }
  setAccountId(id) {
    Logger.info("<call setAccountId>", id);
  }
  setDistinctId(id) {
    Logger.info("<call setDistinctId>", id);
  }
  setFirebaseAppInstanceId(id) {
    Logger.info("<call setFirebaseAppInstanceId>", id);
  }
  setAppsFlyerId(id) {
    Logger.info("<call setAppsFlyerId>", id);
  }
  setKochavaId(id) {
    Logger.info("<call setKochavaId>", id);
  }
  setAdjustId(id) {
    Logger.info("<call setAdjustId>", id);
  }
  setStaticCommonProperties(properties) {
    Logger.info("<call setStaticCommonProperties>", properties);
  }
  clearStaticCommonProperties() {
    Logger.info("<call clearStaticCommonProperties>");
  }
  setCommonProperties(callback) {
    Logger.info("<call setCommonProperties>", callback);
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties() {
    Logger.info("<call clearCommonProperties>");
    this.dynamicPropertiesCallback = null;
  }
};

// src/sandbox/shim/WebShim.ts
var WebShim = class {
  getStorage(key) {
    return __async(this, null, function* () {
      const data = localStorage.getItem(key);
      return JSON.parse(data || "null");
    });
  }
  setStorage(key, value) {
    return __async(this, null, function* () {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    });
  }
  removeStorage(name) {
    return __async(this, null, function* () {
      localStorage.removeItem(name);
    });
  }
  request(options) {
    return __async(this, null, function* () {
      return TaskQueue.tryExecute([
        () => this.requestByBeacon(options),
        () => this.requestByXHR(options),
        () => this.requestByImage(options)
      ]);
    });
  }
  requestByBeacon(_0) {
    return __async(this, arguments, function* ({ url, data }) {
      var _a;
      if (!(typeof ((_a = globalThis.navigator) == null ? void 0 : _a.sendBeacon) === "function")) {
        return Promise.reject(new Error("sendBeacon is not supported"));
      }
      const response = navigator.sendBeacon(url, JSON.stringify(data));
      return response ? Promise.resolve() : Promise.reject(new Error("Request failed"));
    });
  }
  useXHR() {
    if (globalThis.XMLHttpRequest) {
      return new globalThis.XMLHttpRequest();
    } else if (globalThis.XDomainRequest) {
      const xhr = new globalThis.XDomainRequest();
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      return xhr;
    } else if (globalThis.ActiveXObject) {
      return TaskQueue.tryExecute([
        () => new globalThis.ActiveXObject("Msxml2.XMLHTTP"),
        () => new globalThis.ActiveXObject("Microsoft.XMLHTTP")
      ]);
    }
  }
  requestByXHR(options) {
    return __async(this, null, function* () {
      const xhr = this.useXHR();
      if (!xhr)
        return Promise.reject(new Error("XHR is not supported"));
      const { url, data } = options;
      return new Promise((resolve, reject) => {
        xhr.open("POST", url, true);
        xhr.onload = () => {
          const allowOrigin = xhr.getResponseHeader("Access-Control-Allow-Origin");
          if (!(allowOrigin === "*" || (allowOrigin == null ? void 0 : allowOrigin.includes(window.location.href)))) {
            return reject(new Error("Request failed with invalid allow origin"));
          }
          if (!(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            return reject(new Error(`Request failed with status ${xhr.status}`));
          }
          return resolve();
        };
        xhr.onerror = () => reject(new Error("Request failed"));
        xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        xhr.send(JSON.stringify(JSON.stringify(data)));
      });
    });
  }
  requestByImage(options) {
    return __async(this, null, function* () {
      const { url, data } = options;
      return new Promise((resolve, reject) => {
        const img = new Image();
        const urlWithParams = new URL(url);
        Object.entries(data).forEach(([key, value]) => urlWithParams.searchParams.append(key, JSON.stringify(value)));
        img.src = urlWithParams.toString();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Request failed"));
      });
    });
  }
};

// src/sandbox/index.ts
var Web = class extends StaticDataTower {
};
Web.instance = new Sandbox(new WebShim());

// src/cocos/Android.ts
var _CocosAndroid = class _CocosAndroid extends StaticDataTower {
  constructor() {
    super(...arguments);
    this.properties = { "#sdk_type": "js", "#sdk_version_name": version };
    this.dynamicPropertiesCallback = null;
  }
  static generateSignature([args, ret]) {
    return `(${args.map((arg) => this.typeMap[arg]).join("")})${this.typeMap[ret]}`;
  }
  static callStaticMethod(method, signature, ...args) {
    return globalThis.jsb.reflection.callStaticMethod(AndroidClass, method, this.generateSignature(signature), ...args);
  }
  init(config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, this.properties);
    _CocosAndroid.callStaticMethod("initSDK", [["String"], "void"], fmt(config));
  }
  track(eventName, properties) {
    var _a;
    properties = __spreadValues(__spreadValues({}, properties), (_a = this.dynamicPropertiesCallback) == null ? void 0 : _a.call(this));
    _CocosAndroid.callStaticMethod("track", [["String", "String"], "void"], eventName, fmt(properties));
  }
  enableUpload() {
    _CocosAndroid.callStaticMethod("enableUpload", [[], "void"]);
  }
  userSet(properties) {
    _CocosAndroid.callStaticMethod("userSet", [["String"], "void"], fmt(properties));
  }
  userSetOnce(properties) {
    _CocosAndroid.callStaticMethod("userSetOnce", [["String"], "void"], fmt(properties));
  }
  userAdd(properties) {
    _CocosAndroid.callStaticMethod("userAdd", [["String"], "void"], fmt(properties));
  }
  userUnset(properties) {
    _CocosAndroid.callStaticMethod("userUnset", [["String"], "void"], fmt(properties));
  }
  userDelete() {
    _CocosAndroid.callStaticMethod("userDelete", [[], "void"]);
  }
  userAppend(properties) {
    _CocosAndroid.callStaticMethod("userAppend", [["String"], "void"], fmt(properties));
  }
  userUniqAppend(properties) {
    _CocosAndroid.callStaticMethod("userUniqAppend", [["String"], "void"], fmt(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => _CocosAndroid.callStaticMethod("getDataTowerId", [["String"], "void"], cb), callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => _CocosAndroid.callStaticMethod("getDistinctId", [["String"], "void"], cb), callback);
  }
  setAccountId(id) {
    _CocosAndroid.callStaticMethod("setAccountId", [["String"], "void"], id);
  }
  setDistinctId(id) {
    _CocosAndroid.callStaticMethod("setDistinctId", [["String"], "void"], id);
  }
  setFirebaseAppInstanceId(id) {
    _CocosAndroid.callStaticMethod("setFirebaseAppInstanceId", [["String"], "void"], id);
  }
  setAppsFlyerId(id) {
    _CocosAndroid.callStaticMethod("setAppsFlyerId", [["String"], "void"], id);
  }
  setKochavaId(id) {
    _CocosAndroid.callStaticMethod("setKochavaId", [["String"], "void"], id);
  }
  setAdjustId(id) {
    _CocosAndroid.callStaticMethod("setAdjustId", [["String"], "void"], id);
  }
  setStaticCommonProperties(properties) {
    _CocosAndroid.callStaticMethod("setStaticCommonProperties", [["String"], "void"], fmt(properties));
  }
  clearStaticCommonProperties() {
    _CocosAndroid.callStaticMethod("clearStaticCommonProperties", [[], "void"]);
  }
  setCommonProperties(callback) {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties() {
    this.dynamicPropertiesCallback = null;
  }
};
_CocosAndroid.instance = new _CocosAndroid();
_CocosAndroid.typeMap = {
  void: "V",
  int: "I",
  float: "F",
  boolean: "Z",
  String: "Ljava/lang/String;"
};
var CocosAndroid = _CocosAndroid;

// src/cocos/IOS.ts
var _CocosIOS = class _CocosIOS extends StaticDataTower {
  constructor() {
    super(...arguments);
    this.properties = { "#sdk_type": "js", "#sdk_version_name": version };
    this.dynamicPropertiesCallback = null;
  }
  static callStaticMethod(method, ...args) {
    return globalThis.jsb.reflection.callStaticMethod(IOSClass, method, ...args);
  }
  init(config) {
    config = Object.assign({}, DEFAULT_INITIAL_CONFIG, config, this.properties);
    _CocosIOS.callStaticMethod("initSDK:", fmt(config));
  }
  track(eventName, properties) {
    var _a;
    properties = __spreadValues(__spreadValues({}, properties), (_a = this.dynamicPropertiesCallback) == null ? void 0 : _a.call(this));
    _CocosIOS.callStaticMethod("track:properties:", eventName, fmt(properties));
  }
  enableUpload() {
    _CocosIOS.callStaticMethod("enableUpload");
  }
  userSet(properties) {
    _CocosIOS.callStaticMethod("userSet:", fmt(properties));
  }
  userSetOnce(properties) {
    _CocosIOS.callStaticMethod("userSetOnce:", fmt(properties));
  }
  userAdd(properties) {
    _CocosIOS.callStaticMethod("userAdd:", fmt(properties));
  }
  userUnset(properties) {
    properties.forEach((prop) => _CocosIOS.callStaticMethod("userUnset:", prop));
  }
  userDelete() {
    _CocosIOS.callStaticMethod("userDelete");
  }
  userAppend(properties) {
    _CocosIOS.callStaticMethod("userAppend:", fmt(properties));
  }
  userUniqAppend(properties) {
    _CocosIOS.callStaticMethod("userUniqAppend:", fmt(properties));
  }
  getDataTowerId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDataTowerId(resolve));
    globalNativeCallback((cb) => _CocosIOS.callStaticMethod("getDataTowerId:", cb), callback);
  }
  getDistinctId(callback) {
    if (!callback)
      return new Promise((resolve) => this.getDistinctId(resolve));
    globalNativeCallback((cb) => _CocosIOS.callStaticMethod("getDistinctId:", cb), callback);
  }
  setAccountId(id) {
    _CocosIOS.callStaticMethod("setAccountId:", id);
  }
  setDistinctId(id) {
    _CocosIOS.callStaticMethod("setDistinctId:", id);
  }
  setFirebaseAppInstanceId(id) {
    _CocosIOS.callStaticMethod("setFirebaseAppInstanceId:", id);
  }
  setAppsFlyerId(id) {
    _CocosIOS.callStaticMethod("setAppsFlyerId:", id);
  }
  setKochavaId(id) {
    _CocosIOS.callStaticMethod("setKochavaId:", id);
  }
  setAdjustId(id) {
    _CocosIOS.callStaticMethod("setAdjustId:", id);
  }
  setStaticCommonProperties(properties) {
    _CocosIOS.callStaticMethod("setStaticCommonProperties:", fmt(properties));
  }
  clearStaticCommonProperties() {
    _CocosIOS.callStaticMethod("clearStaticCommonProperties");
  }
  setCommonProperties(callback) {
    this.dynamicPropertiesCallback = callback;
  }
  clearCommonProperties() {
    this.dynamicPropertiesCallback = null;
  }
};
_CocosIOS.instance = new _CocosIOS();
var CocosIOS = _CocosIOS;

// src/cocos/index.ts
var Cocos = {
  [globalThis.cc.sys.Platform.ANDROID]: CocosAndroid,
  [globalThis.cc.sys.Platform.IOS]: CocosIOS
}[globalThis.cc.sys.platform] || Web;
var cocos_default = Cocos;

export { Cocos as DataTower, LogLevel, cocos_default as default };
