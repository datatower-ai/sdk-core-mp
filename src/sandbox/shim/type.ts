export interface Shim {
  getStorage<T = unknown>(key: string): Promise<T | null>;
  setStorage<T>(key: string, value: T): Promise<void>;
  removeStorage(name: string): Promise<void>;
  request(options: RequestOptions): Promise<void>;
  getSystemInfo(): SystemInfo;
  getUserAgent(): string;
  getReferrer(): string;
  getNetworkStatus?(): void;
  onNetworkStatusChange?(callback: () => void): void;
}

/**
 * 请求参数
 */
export interface RequestOptions {
  url: string;
  data: string;
}

export interface SystemInfo {
  height: number;
  width: number;
  language: string;
  appId?: string;
}
