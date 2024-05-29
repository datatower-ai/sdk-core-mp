import type { RequestOptions, Shim, SystemInfo } from './type';

export enum MiniProgramPlatform {
  WECHAT = 'WECHAT APP',
  QQ = 'QQ APP',
  BAIDU = 'BAIDU APP',
  TOUTIAO = 'TOUTIAO APP',
  ALIPAY = 'ALIPAY APP',
  DINGDING = 'DINGDING APP',
  KUAISHOU = 'KUAISHOU APP',
  QIHOO = 'QIHOO APP',
  TAOBAO = 'TAOBAO APP',
  JINGDONG = 'JINGDONG APP',
}

export enum MiniGamePlatform {
  WECHAT = 'WECHAT GAME',
  QQ = 'QQ GAME',
  BAIDU = 'BAIDU GAME',
  TOUTIAO = 'TOUTIAO GAME',
  ALIPAY = 'ALIPAY GAME',
  BILIBILI = 'BILIBILI GAME',
  QIHOO = 'QIHOO GAME',
}

/**
 * TODO:
 * mini program/mini game shim
 */
export class MiniShim implements Shim {
  private api: Record<string, any>;

  constructor(private platform: MiniGamePlatform | MiniProgramPlatform) {
    switch (platform) {
      case MiniProgramPlatform.WECHAT:
      case MiniGamePlatform.WECHAT:
        this.api = wx;
        break;
      case MiniProgramPlatform.QQ:
      case MiniGamePlatform.QQ:
        this.api = qq;
        break;
      case MiniProgramPlatform.BAIDU:
      case MiniGamePlatform.BAIDU:
        this.api = swan;
        break;
      case MiniProgramPlatform.TOUTIAO:
      case MiniGamePlatform.TOUTIAO:
        this.api = tt;
        break;
      case MiniProgramPlatform.ALIPAY:
      case MiniGamePlatform.ALIPAY:
      case MiniProgramPlatform.TAOBAO:
        this.api = my;
        break;
      case MiniProgramPlatform.DINGDING:
        this.api = dd;
        break;
      case MiniProgramPlatform.KUAISHOU:
        this.api = ks;
        break;
      case MiniProgramPlatform.QIHOO:
      case MiniGamePlatform.QIHOO:
        this.api = qh;
        break;
      case MiniProgramPlatform.JINGDONG:
        this.api = jd;
        break;
      case MiniGamePlatform.BILIBILI:
        this.api = bl;
      default:
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

  request(options: RequestOptions): Promise<void> {
    return new Promise<void>((success, fail) => {
      const { url, data } = options;

      switch (this.platform) {
        case MiniProgramPlatform.TAOBAO:
          this.api.tb.request({ url, method: 'POST', body: JSON.stringify(JSON.stringify(data)), success, fail });
          break;
        default:
          this.api.request({ url, data: JSON.stringify(data), success, fail });
          break;
      }
    });
  }

  getSystemInfo(): SystemInfo {
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
      appId: sys.host.appId,
    };
  }

  getUserAgent(): string {
    const sys = this.api.getSystemInfoSync();
    // `设备品牌及型号; 操作系统及版本; 平台及版本号`
    return `${sys.brand} ${sys.model}; ${sys.system}; ${this.platform} ${sys.version}`;
  }

  getReferrer(): string {
    const pages = this.api.getCurrentPages();
    if (!pages?.length) return '';
    return decodeURI(pages[pages.length - 2].route);
  }

  getUrl(): string {
    const pages = this.api.getCurrentPages();
    if (!pages?.length) return '';
    return decodeURI(pages[pages.length - 1].route);
  }
}
