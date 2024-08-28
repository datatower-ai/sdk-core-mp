/** 日志级别 */
export const enum LogLevel {
  VERBOSE = 1,
  ASSERT = 2,
  DEBUG = 3,
  INFO = 4,
  WARN = 5,
  ERROR = 6,
}

/**
 * console log by level
 */
export class Logger {
  static level: LogLevel = LogLevel.VERBOSE;
  static verbose(...args: any[]) {
    if (this.level > LogLevel.VERBOSE) return;
    console.log('%c[DataTower:VERBOSE]', 'color: gray', ...args);
  }
  static assert(condition?: boolean | undefined, ...args: any[]) {
    if (this.level > LogLevel.ASSERT) return;
    console.assert(condition, '%c[DataTower:ASSERT]', 'color: purple', ...args);
  }
  static debug(...args: any[]) {
    if (this.level > LogLevel.DEBUG) return;
    console.debug('%c[DataTower:DEBUG]', 'color: blue', ...args);
  }
  static info(...args: any[]) {
    if (this.level > LogLevel.INFO) return;
    console.info('%c[DataTower:INFO]', 'color: green', ...args);
  }
  static warn(...args: any[]) {
    if (this.level > LogLevel.WARN) return;
    console.warn('%c[DataTower:WARN]', 'color: orange', ...args);
  }
  static error(...args: any[]) {
    if (this.level > LogLevel.ERROR) return;
    console.error('%c[DataTower:ERROR]', 'color: red', ...args);
  }
}
