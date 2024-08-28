import { describe, expect, test } from 'vitest';
import { parseUrl, stringifyUrl, splitOnce, trimEnd } from '../src/utils';

describe('splitOnce', () => {
  test('splitOnce, has separator', async () => {
    expect(splitOnce('a-b-c', '-')).toEqual(['a', 'b-c']);
    expect(splitOnce('a-b-c', '-', true)).toEqual(['a-b', 'c']);
  });

  test('splitOnce, no separator', async () => {
    expect(splitOnce('abc', '-')).toEqual(['abc', '']);
    expect(splitOnce('abc', '-', true)).toEqual(['', 'abc']);
  });
});

describe('trimEnd', () => {
  test('trimEnd, two char', async () => {
    expect(trimEnd('abc//', '/')).toBe('abc');
  });
  test('trimEnd, has char', async () => {
    expect(trimEnd('abc/', '/')).toBe('abc');
  });

  test('trimEnd, no char', async () => {
    expect(trimEnd('abc', '/')).toBe('abc');
  });

  test('trimEnd, only one', async () => {
    expect(trimEnd('/', '/')).toBe('');
  });

  test('trimEnd, empty', async () => {
    expect(trimEnd('', '/')).toBe('');
  });
});

describe('parseUrl & stringifyUrl', () => {
  test('parseUrl & stringifyUrl, full', async () => {
    const url = 'http://root:pass@www.example.com:80/home?id=1#fragment';
    const opts = {
      protocol: 'http',
      username: 'root',
      password: 'pass',
      hostname: 'www.example.com',
      port: 80,
      pathname: 'home',
      query: { id: '1' },
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);

    expect(stringifyUrl(opts, 'host')).toBe('www.example.com:80');
    expect(stringifyUrl(opts, 'origin')).toBe('http://www.example.com:80');
  });

  test('parseUrl & stringifyUrl, no hash', async () => {
    const url = 'http://root:pass@www.example.com:80/home?id=1';
    const opts = {
      protocol: 'http',
      username: 'root',
      password: 'pass',
      hostname: 'www.example.com',
      port: 80,
      pathname: 'home',
      query: { id: '1' },
      hash: '',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, no query', async () => {
    const url = 'http://root:pass@www.example.com:80/home#fragment';
    const opts = {
      protocol: 'http',
      username: 'root',
      password: 'pass',
      hostname: 'www.example.com',
      port: 80,
      pathname: 'home',
      query: void 0,
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, no path', async () => {
    const url = 'http://root:pass@www.example.com:80?id=1#fragment';
    const opts = {
      protocol: 'http',
      username: 'root',
      password: 'pass',
      hostname: 'www.example.com',
      port: 80,
      pathname: '',
      query: { id: '1' },
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, no port', async () => {
    const url = 'http://root:pass@www.example.com/home?id=1#fragment';
    const opts = {
      protocol: 'http',
      username: 'root',
      password: 'pass',
      hostname: 'www.example.com',
      port: void 0,
      pathname: 'home',
      query: { id: '1' },
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, no auth', async () => {
    const url = 'http://www.example.com:80/home?id=1#fragment';
    const opts = {
      protocol: 'http',
      username: '',
      password: '',
      hostname: 'www.example.com',
      port: 80,
      pathname: 'home',
      query: { id: '1' },
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, no protocol', async () => {
    const url = 'www.example.com:80/home?id=1#fragment';
    const opts = {
      protocol: '',
      username: '',
      password: '',
      hostname: 'www.example.com',
      port: 80,
      pathname: 'home',
      query: { id: '1' },
      hash: 'fragment',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);
  });

  test('parseUrl & stringifyUrl, only host', async () => {
    const url = 'www.example.com';
    const opts = {
      protocol: '',
      username: '',
      password: '',
      hostname: 'www.example.com',
      port: void 0,
      pathname: '',
      query: void 0,
      hash: '',
    };
    expect(parseUrl(url)).toEqual(opts);
    expect(stringifyUrl(opts)).toBe(url);

    expect(stringifyUrl(opts, 'host')).toBe('www.example.com');
    expect(stringifyUrl(opts, 'origin')).toBe('www.example.com');
  });
});
