import { Utf8 } from 'crypto-es/lib/core';
import { Base64 } from 'crypto-es/lib/enc-base64';
import { MD5 } from 'crypto-es/lib/md5';
import { UAParser } from 'ua-parser-js';

export function encodeBase64(data: string): string {
  return Base64.stringify(Utf8.parse(data));
}

export function md5(data: string): string {
  return MD5(data).toString();
}

export function parseUserAgent(ua?: string) {
  return UAParser(ua);
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

export function throttle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]) {
    if (timer) return;
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = null;
    }, delay);
  } as T;
}

export function splitOnce(str: string, separator: string, reverse?: boolean): [string, string] {
  const index = !reverse ? str.indexOf(separator) : str.lastIndexOf(separator);
  return index > 0 ? [str.slice(0, index), str.slice(index + separator.length)] : !reverse ? [str, ''] : ['', str];
}

export function trimEnd(str: string, char: string): string {
  let i = str.length - 1;
  while (str[i] === char) i--;
  return str.slice(0, i + 1);
}

export function parseUrl(url: string) {
  const [protocol, temp1] = splitOnce(url, '://', true);
  const [auth, temp2] = splitOnce(temp1, '@', true);
  const [temp3, hash] = splitOnce(temp2, '#');
  const [temp4, search] = splitOnce(temp3, '?');
  const [temp5, pathname] = splitOnce(temp4, '/');
  const [hostname, port] = splitOnce(temp5, ':');
  const [username, password] = splitOnce(auth, ':', true);
  const query = search ? Object.fromEntries(search.split('&').map((it) => it.split('='))) : void 0;

  return { protocol, username, password, hostname, port: port ? +port : void 0, pathname, query, hash };
}

export type PartialWithout<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
export type ParseURLOptions = PartialWithout<ReturnType<typeof parseUrl>, 'hostname'>;

export function stringifyUrl(opts: ParseURLOptions, level: 'href' | 'origin' | 'host' = 'href') {
  const { protocol = '', username, password, hostname, port = '', pathname = '', query = '', hash = '' } = opts;
  const _protocol = protocol && `${protocol}://`;
  const auth = username && password ? `${username}:${password}@` : '';
  const _hostname = trimEnd(hostname, '/');
  const _port = port ? `:${port}` : '';
  const _pathname = pathname && (pathname.startsWith('/') ? pathname : `/${pathname}`);
  const search =
    query &&
    `?${Object.entries(query)
      .map((kv) => kv.join('='))
      .join('&')}`;
  const _hash = hash && `#${hash}`;

  switch (level) {
    case 'href':
      return `${_protocol}${auth}${_hostname}${_port}${_pathname}${search}${_hash}`;
    case 'origin':
      return `${_protocol}${_hostname}${_port}`;
    case 'host':
      return `${_hostname}${_port}`;
  }
}
