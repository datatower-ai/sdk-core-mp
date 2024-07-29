import { Logger } from './sandbox';

export class MultipleInstanceManager<T = Object> {
  constructor(private readonly create: () => T) {}
  private readonly instances: Record<string, T> = {};
  add(id: string) {
    const instance = this.create();
    if (!this.instances.default) {
      return (this.instances.default = instance);
    } else if (!this.instances[id]) {
      return (this.instances[id] = instance);
    } else {
      Logger.warn('DataTower', `instance '${id}' already exists, will be replaced`);
      return this.instances[id];
    }
  }
  get(app_id: string = 'default'): T | null {
    const instance = this.instances[app_id];
    if (instance) return instance;
    Logger.error('DataTower', `instance '${app_id}' not found, please initialize SDK first`);
    return null;
  }
}
