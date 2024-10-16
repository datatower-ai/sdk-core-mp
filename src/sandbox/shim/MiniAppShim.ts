import type { RequestOptions, Shim, SystemInfo } from './type';

/**
 * mini program/game shim
 */
export class MiniAppShim implements Shim {
  private readonly api: Record<string, any>;
  private readonly platform: string;

  constructor() {
    if (uni) {
      this.api = uni;
      this.platform = 'uniapp';
    } else if (wx) {
      this.api = wx;
      this.platform = 'wechat';
    } else if (qq) {
      this.api = qq;
      this.platform = 'qq';
    } else if (swan) {
      this.api = swan;
      this.platform = 'baidu';
    } else if (tt) {
      this.api = tt;
      this.platform = 'toutiao';
    } else if (my) {
      this.api = my;
      this.platform = 'alipay';
    } else if (dd) {
      this.api = dd;
      this.platform = 'dingding';
    } else if (ks) {
      this.api = ks;
      this.platform = 'kuaishou';
    } else if (qh) {
      this.api = qh;
      this.platform = 'qihoo';
    } else if (jd) {
      this.api = jd;
      this.platform = 'jingdong';
    } else if (bl) {
      this.api = bl;
      this.platform = 'bilibili';
    } else {
      throw new Error('Unsupported platform');
    }
  }

  getStorage<T = unknown>(key: string): Promise<T | null> {
    return new Promise((success, fail) => {
      this.api.getStorage({ key, success, fail }).then((data: string) => JSON.parse(data || 'null'));
    });
  }

  setStorage<T>(key: string, value: T): Promise<void> {
    const data = JSON.stringify(value);
    return new Promise<any>((success, fail) => {
      this.api.setStorage({ key, data, success, fail });
    });
  }

  removeStorage(name: string): Promise<void> {
    return new Promise((success, fail) => {
      this.api.removeStorage({ key: name, success, fail });
    });
  }

  onUnload(callback: () => void): void {
    this.api.onUnload(callback);
  }

  request(options: RequestOptions): Promise<void> {
    return new Promise<void>((success, fail) => {
      const { url, params } = options;

      switch (this.platform) {
        case 'alipay':
          this.api.tb.request({ url, method: 'POST', body: JSON.stringify(JSON.stringify(params)), success, fail });
          break;
        default:
          this.api.request({ url, data: JSON.stringify(params), success, fail });
          break;
      }
    });
  }

  get systemInfo(): SystemInfo {
    const sys = this.api.getSystemInfoSync();
    const [osName, osVersion] = sys.system.split(' ');
    return {
      height: sys.screenHeight,
      width: sys.screenWidth,
      language: sys.language,
      device: { brand: sys.brand, model: sys.model },
      os: { name: osName, version: osVersion },
      platform: { name: this.platform, version: sys.version },
      viewport: { height: sys.windowHeight, width: sys.windowWidth },
      // TODO:
      title: '',
    };
  }

  get userAgent(): string {
    const sys = this.api.getSystemInfoSync();
    // `设备品牌及型号; 操作系统及版本; 平台及版本号`
    return `${sys.brand} ${sys.model}; ${sys.system}; ${this.platform} ${sys.version}`;
  }

  get referrer(): string {
    const pages = this.api.getCurrentPages();
    if (!pages?.length) return '';
    return decodeURI(pages[pages.length - 2].route);
  }

  get href(): string {
    const pages = this.api.getCurrentPages();
    if (!pages?.length) return '';
    return decodeURI(pages[pages.length - 1].route);
  }
}
