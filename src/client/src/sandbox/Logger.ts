import { LogLevel } from '@/type';

/**
 * console log by level
 */
export class Logger {
  static level: LogLevel = LogLevel.VERBOSE;
  static verbose(...args: any[]) {
    if (this.level > LogLevel.VERBOSE) return;
    console.log('[VERBOSE]', ...args);
  }
  static assert(condition?: boolean | undefined, ...args: any[]) {
    if (this.level > LogLevel.ASSERT) return;
    console.assert(condition, '[ASSERT]', ...args);
  }
  static debug(...args: any[]) {
    if (this.level > LogLevel.DEBUG) return;
    console.debug('[DEBUG]', ...args);
  }
  static info(...args: any[]) {
    if (this.level > LogLevel.INFO) return;
    console.info('[INFO]', ...args);
  }
  static warn(...args: any[]) {
    if (this.level > LogLevel.WARN) return;
    console.warn('[WARN]', ...args);
  }
  static error(...args: any[]) {
    if (this.level > LogLevel.ERROR) return;
    console.error('[ERROR]', ...args);
  }
}
