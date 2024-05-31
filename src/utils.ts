// TODO: tsup打包时需要显式引入，才能将三方库源码打包进去
import { MD5 } from '$/crypto-es/lib/md5';
import { SHA256 } from '$/crypto-es/lib/sha256';

export function md5(data: string): string {
  return MD5(data).toString();
}

export function sha256(data: string): string {
  return SHA256(data).toString();
}

// 序列化
export function fmt(obj: Record<string, any>) {
  return JSON.stringify(obj);
}

/**
 * 与原生通信的回调函数
 * @param callNative 调用原生方法
 * @param callback 回调函数
 */
export function globalNativeCallback<T>(callNative: (callbackName: string) => void, callback: (arg: T) => void): void {
  const callbackName = `__${Date.now()}__` as const;
  // 将回调函数挂载到全局，供原生调用
  window[callbackName] = (arg: T) => {
    callback(arg);
    // 删除回调函数
    delete window[callbackName];
  };
  callNative(callbackName);
}

export function debounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = null;
    }, delay);
  } as T;
}
