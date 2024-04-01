type SyncTask<T> = () => T;
type AsyncTask<T> = () => Promise<T>;
type Task<T, S extends boolean | unknown = unknown> = S extends true
  ? SyncTask<T>
  : S extends false
    ? AsyncTask<T>
    : SyncTask<T> | AsyncTask<T>;

/**
 * task queue
 */
export class TaskQueue<T, S extends boolean | unknown = unknown> {
  private processing: boolean = false;
  private queue: Task<T, S>[] = [];
  private onMaxSizeCallback?: () => void;
  private onEnqueueCallback?: (task: Task<T, S>) => void;
  private onDequeueCallback?: (task: Task<T, S>) => void;
  private onErrorCallback?: (task: Task<T, S>, error: Error) => void;

  constructor(private maxSize: number = Infinity) {}

  get size(): number {
    return this.queue.length;
  }

  setMaxSize(size: number): void {
    this.maxSize = size;
  }

  enqueue(task: Task<T, S>, ...tasks: Task<T, S>[]): void {
    [task, ...tasks].forEach((task) => {
      this.queue.push(task);
      this.onEnqueueCallback?.(task);
      if (this.queue.length >= this.maxSize) {
        this.onMaxSizeCallback?.();
      }
    });
  }

  dequeue(): Task<T, S> | undefined {
    const task = this.queue.shift();
    if (!task) return;
    this.onDequeueCallback?.(task);
    return task;
  }

  onMaxSize(callback: () => void): void {
    this.onMaxSizeCallback = callback;
  }

  onEnqueue(callback: (task: Task<T, S>) => void): void {
    this.onEnqueueCallback = callback;
  }

  onDequeue(callback: (task: Task<T, S>) => void): void {
    this.onDequeueCallback = callback;
  }

  onError(callback: (task: Task<T, S>, error: Error) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * execute all tasks at the same time, and clear the queue
   * don't call onDequeueCallback
   */
  flush(): S extends true ? T[] : S extends false ? Promise<T[]> : Promise<T[]> | T[] {
    let isAllSync = true;
    const tasks = this.queue.map((task) => {
      if (task instanceof Promise) {
        isAllSync = false;
        return task.catch((error) => this.onErrorCallback?.(task, error));
      }
      try {
        return task();
      } catch (error: any) {
        this.onErrorCallback?.(task, error);
      }
    });
    this.queue = [];
    return isAllSync ? (tasks as T) : (Promise.all(tasks) as any);
  }

  /**
   * execute all tasks in order, and clear the queue
   * don't call onDequeueCallback
   */
  async start(): Promise<void> {
    if (this.processing) return;
    this.processing = true;
    await this.startExecuteNext();
    this.processing = false;
  }
  private async startExecuteNext() {
    if (this.queue.length === 0) return;
    const task = this.queue.shift()!;
    try {
      await task();
    } catch (error: any) {
      this.onErrorCallback?.(task, error);
    }
    await this.startExecuteNext();
  }

  /**
   * from the beginning to the single execution task
   * if failed, perform the next task, until successful
   */
  static tryExecute<T = unknown>(tasks: SyncTask<T>[]): T | void;
  static tryExecute<T = unknown>(tasks: AsyncTask<T>[]): Promise<T | void>;
  static tryExecute<T = unknown>(tasks: Task<T>[]): Promise<T | void> | T | void {
    if (tasks.length === 0) return;

    try {
      const task = tasks[0]();
      if (task instanceof Promise) {
        return task.catch(() => {
          if (tasks.length === 1) return Promise.reject();
          return TaskQueue.tryExecute(tasks.slice(1) as AsyncTask<T | void>[]);
        });
      }
      return task;
    } catch {
      if (tasks.length === 1) return;
      return TaskQueue.tryExecute(tasks.slice(1) as SyncTask<T | void>[]);
    }
  }

  tryExecute(): T | void;
  tryExecute(): Promise<T | void>;
  tryExecute(): Promise<T | void> | T | void {
    return TaskQueue.tryExecute(this.queue as []);
  }
}
