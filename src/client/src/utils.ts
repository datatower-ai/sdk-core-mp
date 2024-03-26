const typeMap = {
  void: 'V',
  int: 'I',
  float: 'F',
  boolean: 'Z',
  String: 'Ljava/lang/String;',
};

// 生成Android签名
export type GenerateSignatureParams = [params: (keyof typeof typeMap)[], ret: keyof typeof typeMap];
export function generateSignature([params, ret]: GenerateSignatureParams): string | void {
  return `(${params.map((param) => typeMap[param]).join('')})${typeMap[ret]}`;
}

// 序列化
export function format(obj: Record<string, any>) {
  return obj && JSON.stringify(obj);
}

export function logger(...args: any[]) {
  console.log('[DataTower SDK]', ...args);
}
