import { Utf8 } from 'crypto-es/lib/core';
import { Base64 } from 'crypto-es/lib/enc-base64';
import { MD5 } from 'crypto-es/lib/md5';
/* #if platform === 'web' */
import { UAParser } from 'ua-parser-js';
/* #endif */

export function encodeBase64(data: string): string {
  return Base64.stringify(Utf8.parse(data));
}

export function md5(data: string): string {
  return MD5(data).toString();
}

export function parseUserAgent(ua?: string) {
  return UAParser(ua);
}
