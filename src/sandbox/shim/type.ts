export type Shim = {
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
};

/**
 * 请求参数
 */
export type RequestOptions = {
  url: string;
  params: `data=${string}&check=${string}`;
};

export type SystemInfo = {
  height: number;
  width: number;
  language: string;
  device: Device;
  os: OS;
  platform: Platform;
  viewport: Viewport;
  title: string;
};

export type Device = {
  brand?: string;
  model?: string;
};

export type OS = {
  name?: string;
  version?: string;
};

export type Platform = {
  name?: string;
  version?: string;
};

export type Viewport = {
  height: number;
  width: number;
};
