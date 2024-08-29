import type { RequestOptions, Shim, SystemInfo } from './type';

export enum MiniProgramPlatform {
  WECHAT = 'wechat-mini-program',
  QQ = 'qq-mini-program',
  BAIDU = 'baidu-mini-program',
  TOUTIAO = 'toutiao-mini-program',
  ALIPAY = 'alipay-mini-program',
  DINGDING = 'dingding-mini-program',
  KUAISHOU = 'kuaishou-mini-program',
  QIHOO = 'qihoo-mini-program',
  TAOBAO = 'taobao-mini-program',
  JINGDONG = 'jingdong-mini-program',
}

export enum MiniGamePlatform {
  WECHAT = 'wechat-mini-game',
  QQ = 'qq-mini-game',
  BAIDU = 'baidu-mini-game',
  TOUTIAO = 'toutiao-mini-game',
  ALIPAY = 'alipay-mini-game',
  BILIBILI = 'bilibili-mini-game',
  QIHOO = 'qihoo-mini-game',
}

/**
 * mini program/mini_GAME shim
 */
export class MiniAppShim implements Shim {
  private readonly api: Record<string, any>;

  constructor(private readonly platform: MiniGamePlatform | MiniProgramPlatform | 'uniapp') {
    switch (platform) {
      case 'uniapp':
        this.api = uni;
        break;
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
      const { url, params } = options;

      switch (this.platform) {
        case MiniProgramPlatform.TAOBAO:
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
