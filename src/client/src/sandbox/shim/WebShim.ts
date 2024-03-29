import { RequestOptions } from '../../type';
import { TaskQueue } from '../TaskQueue';

/**
 * TODO:
 * web shim
 */
export class WebShim {
  async getStorage<T = unknown>(key: string): Promise<T | null> {
    const data = localStorage.getItem(key);
    return JSON.parse(data || 'null');
  }

  async setStorage<T>(key: string, value: T): Promise<void> {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  async removeStorage(name: string): Promise<void> {
    localStorage.removeItem(name);
  }

  async request(options: RequestOptions): Promise<void> {
    return TaskQueue.tryExecute([
      () => this.requestByBeacon(options),
      () => this.requestByXHR(options),
      () => this.requestByImage(options),
    ]);
  }

  private async requestByBeacon({ url, data }: RequestOptions): Promise<void> {
    if (!(typeof globalThis.navigator?.sendBeacon === 'function')) {
      return Promise.reject(new Error('sendBeacon is not supported'));
    }

    const response = navigator.sendBeacon(url, JSON.stringify(data));
    return response ? Promise.resolve() : Promise.reject(new Error('Request failed'));
  }

  private useXHR() {
    if (globalThis.XMLHttpRequest) {
      return new globalThis.XMLHttpRequest();
    } else if (globalThis.XDomainRequest) {
      const xhr = new globalThis.XDomainRequest();
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      return xhr;
    } else if (globalThis.ActiveXObject) {
      return TaskQueue.tryExecute([
        () => new globalThis.ActiveXObject!('Msxml2.XMLHTTP'),
        () => new globalThis.ActiveXObject!('Microsoft.XMLHTTP'),
      ]);
    }
  }

  private async requestByXHR(options: RequestOptions): Promise<void> {
    const xhr = this.useXHR();
    if (!xhr) return Promise.reject(new Error('XHR is not supported'));

    const { url, data } = options;
    return new Promise((resolve, reject) => {
      xhr.open('POST', url, true);
      xhr.onload = () => {
        const allowOrigin = xhr.getResponseHeader('Access-Control-Allow-Origin');
        if (!(allowOrigin === '*' || allowOrigin?.includes(window.location.href))) {
          return reject(new Error('Request failed with invalid allow origin'));
        }
        if (!(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          return reject(new Error(`Request failed with status ${xhr.status}`));
        }
        return resolve();
      };

      xhr.onerror = () => reject(new Error('Request failed'));

      xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
      xhr.send(JSON.stringify(JSON.stringify(data)));
    });
  }

  private async requestByImage(options: RequestOptions): Promise<void> {
    const { url, data } = options;
    return new Promise((resolve, reject) => {
      const img = new Image();

      const urlWithParams = new URL(url);
      Object.entries(data).forEach(([key, value]) => urlWithParams.searchParams.append(key, JSON.stringify(value)));

      img.src = urlWithParams.toString();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Request failed'));
    });
  }
}
