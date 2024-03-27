const typeMap = {
  void: 'V',
  int: 'I',
  float: 'F',
  boolean: 'Z',
  String: 'Ljava/lang/String;',
};

export type JavaType = keyof typeof typeMap;
export type GenerateSignatureParams = [args: JavaType[], ret: JavaType];
// 生成Android签名
export function generateSignature([args, ret]: GenerateSignatureParams): string | void {
  return `(${args.map((arg) => typeMap[arg]).join('')})${typeMap[ret]}`;
}

// 序列化
export function fmt(obj: Record<string, any>) {
  return JSON.stringify(obj);
}

export function logger(...args: any[]) {
  console.log('[DataTower SDK]', ...args);
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
