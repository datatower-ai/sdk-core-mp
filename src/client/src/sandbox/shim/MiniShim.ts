import type { RequestOptions, Shim, SystemInfo } from './type';

export enum MiniProgramPlatform {
  WECHAT = 'WECHAT_APP',
  QQ = 'QQ_APP',
  BAIDU = 'BAIDU_APP',
  TOUTIAO = 'TOUTIAO_APP',
  ALIPAY = 'ALIPAY_APP',
  DINGDING = 'DINGDING_APP',
  KUAISHOU = 'KUAISHOU_APP',
  QIHOO = 'QIHOO_APP',
  TAOBAO = 'TAOBAO_APP',
  JINGDONG = 'JINGDONG_APP',
}

export enum MiniGamePlatform {
  WECHAT = 'WECHAT_GAME',
  QQ = 'QQ_GAME',
  BAIDU = 'BAIDU_GAME',
  TOUTIAO = 'TOUTIAO_GAME',
  ALIPAY = 'ALIPAY_GAME',
  BILIBILI = 'BILIBILI_GAME',
  QIHOO = 'QIHOO_GAME',
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
        this.api = globalThis.wx;
        break;
      case MiniProgramPlatform.QQ:
      case MiniGamePlatform.QQ:
        this.api = globalThis.qq;
        break;
      case MiniProgramPlatform.BAIDU:
      case MiniGamePlatform.BAIDU:
        this.api = globalThis.swan;
        break;
      case MiniProgramPlatform.TOUTIAO:
      case MiniGamePlatform.TOUTIAO:
        this.api = globalThis.tt;
        break;
      case MiniProgramPlatform.ALIPAY:
      case MiniGamePlatform.ALIPAY:
      case MiniProgramPlatform.TAOBAO:
        this.api = globalThis.my;
        break;
      case MiniProgramPlatform.DINGDING:
        this.api = globalThis.dd;
        break;
      case MiniProgramPlatform.KUAISHOU:
        this.api = globalThis.ks;
        break;
      case MiniProgramPlatform.QIHOO:
      case MiniGamePlatform.QIHOO:
        this.api = globalThis.qh;
        break;
      case MiniProgramPlatform.JINGDONG:
        this.api = globalThis.jd;
        break;
      case MiniGamePlatform.BILIBILI:
        this.api = globalThis.bl;
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
    return {
      height: sys.windowHeight || sys.screenHeight,
      width: sys.windowWidth || sys.screenWidth,
      language: sys.language,
      appId: sys.host.appId,
    };
  }

  getUserAgent(): string {
    const sys = this.api.getSystemInfoSync();
    // `设备品牌及型号; 操作系统及版本; 平台及版本号`
    return `${sys.brand} ${sys.model}; ${sys.system}; ${this.platform.split('_')[0]} ${sys.version}`;
  }

  getReferrer(): string {
    const pages = this.api.getCurrentPages();
    if (!pages?.length) return '';
    return pages[pages.length - 2].route;
  }
}
