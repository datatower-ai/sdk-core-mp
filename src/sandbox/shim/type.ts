export interface Shim {
  getStorage<T = unknown>(key: string): Promise<T | null>;
  setStorage<T>(key: string, value: T): Promise<void>;
  removeStorage(name: string): Promise<void>;
  request(options: RequestOptions): Promise<void>;
  systemInfo: SystemInfo;
  userAgent: string;
  referrer: string;
  href: string;
  getNetworkStatus?(): void;
  onNetworkStatusChange?(callback: () => void): void;
}

/**
 * 请求参数
 */
export interface RequestOptions {
  url: string;
  params: `data=${string}&check=${string}`;
}

export interface SystemInfo {
  height: number;
  width: number;
  language: string;
  device: Device;
  os: OS;
  platform: Platform;
  viewport: Viewport;
  title: string;
}

export interface Device {
  brand?: string;
  model?: string;
}

export interface OS {
  name?: string;
  version?: string;
}

export interface Platform {
  name?: string;
  version?: string;
}

export interface Viewport {
  height: number;
  width: number;
}
