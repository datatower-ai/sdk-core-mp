export enum MiniProgramPlatform {
  WECHAT = 100,
  QQ,
  BAIDU,
  TOUTIAO,
  ALIPAY,
  DINGDING,
  KUAISHOU,
  QIHOO,
  TAOBAO,
  JINGDONG,
}

export enum MiniGamePlatform {
  WECHAT = 200,
  QQ,
  BAIDU,
  TOUTIAO,
  ALIPAY,
  BILIBILI,
  QIHOO,
}

/**
 * TODO:
 * mini program/mini game shim
 */
export class MiniShim {
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

  getStorage(key: string) {
    return new Promise((success, fail) => {
      this.api.getStorage({ key, success, fail }).then((data: string) => JSON.parse(data || 'null'));
    });
  }

  setStorage(key: string, value: any) {
    const data = JSON.stringify(value);
    return new Promise<any>((success, fail) => {
      this.api.setStorage({ key, data, success, fail });
    });
  }

  removeStorage(name: string) {
    return new Promise((success, fail) => {
      this.api.removeStorage({ key: name, success, fail });
    });
  }

  request<T extends any = any>(options: {
    url: string;
    header?: Record<string, string>;
    params?: Record<string, any>;
    data?: Record<string, any>;
    method?: string;
    timeout?: number;
  }) {
    return new Promise<T>((success, fail) => {
      const { header, params, data, method, timeout } = options;
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      const url = options.url + query;
      const opts = { url, data, method, timeout, success, fail };

      switch (this.platform) {
        case MiniProgramPlatform.TAOBAO:
          const res = this.api.tb.request({
            url,
            method,
            options: JSON.stringify({ timeout }),
            headers: JSON.stringify(header),
            body: JSON.stringify(data),
          });
          success(res);
          break;
        case MiniGamePlatform.ALIPAY:
        case MiniProgramPlatform.ALIPAY:
          this.api.httpRequest({ ...opts, headers: header });
          break;
        case MiniProgramPlatform.DINGDING:
          this.api.httpRequest({ ...opts, headers: header });
          break;
        default:
          this.api.request({ ...opts, header });
          break;
      }
    });
  }

  getNetworkStatus() {}

  onNetworkStatusChange(callback: () => void) {}

  getSystemInfo() {}

  getAppOptions() {}

  showToast(msg: string) {}
}
