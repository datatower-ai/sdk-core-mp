import { RequestOptions } from '../../type';
import { TaskQueue } from '../TaskQueue';

class WebRequest {
  private supports = { beacon: true, xhr: true, cors: true, image: true };

  async request(options: RequestOptions): Promise<void> {
    const { beacon, xhr, cors, image } = this.supports;
    const tasks: (() => Promise<void>)[] = [];

    if (beacon) tasks.push(() => this.requestByBeacon(options));
    if (xhr && cors) tasks.push(() => this.requestByXHR(options));
    if (image) tasks.push(() => this.requestByImage(options));

    return TaskQueue.tryExecute(tasks);
  }

  private async requestByBeacon({ url, data }: RequestOptions): Promise<void> {
    if (!(typeof globalThis.navigator?.sendBeacon === 'function')) {
      this.supports.beacon = false;
      return Promise.reject(new Error('sendBeacon is not supported'));
    }

    const response = navigator.sendBeacon(url, data);
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
    this.supports.xhr = false;
  }

  private async requestByXHR(options: RequestOptions): Promise<void> {
    const xhr = this.useXHR();
    if (!xhr) return Promise.reject(new Error('XHR is not supported'));

    const { url, data } = options;
    return new Promise((resolve, reject) => {
      xhr.open('POST', url, true);
      xhr.onload = () => {
        if (!(xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          return reject(new Error(`Request failed with status ${xhr.status}`));
        }
        return resolve();
      };

      xhr.onerror = () => {
        const allowOrigin = xhr.getResponseHeader('Access-Control-Allow-Origin');
        if (!(allowOrigin === '*' || allowOrigin?.includes(window.location.origin))) {
          this.supports.cors = false;
          return reject(new Error('Request failed with invalid allow origin'));
        }
        reject(new Error('Request failed'));
      };

      xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
      xhr.send(data);
    });
  }

  private async requestByImage(options: RequestOptions): Promise<void> {
    if (!(typeof globalThis.Image === 'function')) {
      this.supports.image = false;
      return Promise.reject(new Error('Image is not supported'));
    }
    const { url, data } = options;
    return new Promise((resolve, reject) => {
      const img = new Image(1, 1);
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Request failed'));
      img.src = url.includes('?') ? `${url}&${data}` : `${url}?${data}`;
    });
  }
}

/**
 * web shim
 */
export class WebShim extends WebRequest {
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
}
