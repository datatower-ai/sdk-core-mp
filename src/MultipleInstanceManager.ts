import { Logger } from '@/Logger';

export class MultipleInstanceManager<T = Object> {
  constructor(private readonly create: () => T) {}
  private readonly instances: Record<string, T> = {};
  private default = '';
  add(id: string) {
    const instance = this.create();
    if (!this.default) this.default = id;
    if (!this.instances[id]) {
      return (this.instances[id] = instance);
    } else {
      Logger.warn('DataTower', `instance '${id}' already exists, no need to initialize again`);
      return this.instances[id];
    }
  }
  get(id: string = this.default): T | null {
    const instance = this.instances[id];
    if (instance) return instance;
    Logger.error('DataTower', `instance '${id}' not found, please initialize SDK first`);
    return null;
  }
}
