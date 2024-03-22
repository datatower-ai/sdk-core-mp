const typeMap = {
  string: 'Ljava/lang/String;',
  number: 'Ljava/lang/Double;',
  boolean: 'Ljava/lang/Boolean;',
  map: 'Ljava/util/Map;',
  array: 'Ljava/util/List;',
};

// 生成Android签名
export function generateSignature(types: (keyof typeof typeMap)[]): string {
  return `(${types.map((type) => typeMap[type]).join('')})V`;
}

export function logger(...args: any[]) {
  console.log('[DataTower SDK]:', ...args);
}
