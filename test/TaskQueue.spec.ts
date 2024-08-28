import { expect, test } from 'vitest';
import { TaskQueue } from '../src/TaskQueue';

test('TaskQueue tryExecute', async () => {
  const res1 = await TaskQueue.tryExecute([() => Promise.reject(), () => Promise.resolve(2), () => Promise.reject()]);
  expect(res1).toBe(2);

  const res2 = await TaskQueue.tryExecute([() => Promise.reject(), () => Promise.reject(), () => Promise.resolve(3)]);
  expect(res2).toBe(3);

  const res3 = await TaskQueue.tryExecute([() => Promise.reject(), () => Promise.reject(), () => Promise.reject()]);
  expect(res3).toBe(undefined);
});

test('TaskQueue size', async () => {
  const queue = new TaskQueue(2);

  let overMaxSize = false;
  queue.onMaxSize(() => {
    overMaxSize = true;
  });

  queue.enqueue(() => Promise.resolve(1));
  expect(overMaxSize).toBe(false);
  queue.enqueue(() => Promise.resolve(2));
  expect(overMaxSize).toBe(true);
  expect(queue.size).toBe(2);
  queue.enqueue(() => Promise.resolve(3));
  expect(overMaxSize).toBe(true);
  queue.dequeue();
  expect(queue.size).toBe(2);
});

test('TaskQueue onEnqueue & onDequeue', async () => {
  const queue = new TaskQueue();

  let count = 0;
  queue.onEnqueue(() => count++);
  queue.onDequeue(() => count--);

  expect(count).toBe(0);
  queue.enqueue(() => Promise.resolve(1));
  expect(count).toBe(1);
  queue.enqueue(() => Promise.reject('error'));
  expect(count).toBe(2);
  queue.dequeue();
  expect(count).toBe(1);
  queue.dequeue();
  expect(count).toBe(0);
  queue.dequeue();
  expect(count).toBe(0);
});

test('TaskQueue flush', async () => {
  const queue = new TaskQueue<number, false>();

  queue.enqueue(() => Promise.resolve(1));
  queue.enqueue(() => Promise.resolve(2));
  expect(queue.size).toBe(2);
  const result1 = await Promise.all(queue.flush());
  expect(result1).toEqual([1, 2]);
  expect(queue.size).toBe(0);

  queue.enqueue(() => Promise.reject('error'));
  queue.enqueue(() => Promise.resolve(2));
  queue.enqueue(() => Promise.resolve(3));
  expect(queue.size).toBe(3);
  const result2 = await Promise.allSettled(queue.flush());
  expect(result2).toEqual([
    { status: 'rejected', reason: 'error' },
    { status: 'fulfilled', value: 2 },
    { status: 'fulfilled', value: 3 },
  ]);
  expect(queue.size).toBe(0);
});

test('TaskQueue start', async () => {
  const queue = new TaskQueue();

  const result: number[] = [];
  queue.enqueue(async () => result.push(1));
  queue.enqueue(() => {
    expect(result).toEqual([1]);
    return result.push(2);
  });
  queue.enqueue(async () => {
    expect(result).toEqual([1, 2]);
    return result.push(3);
  });

  await queue.start();
  expect(result).toEqual([1, 2, 3]);
});

test('TaskQueue onError', async () => {
  const queue = new TaskQueue<number>();

  let reason = '';
  queue.onError((task, error) => {
    reason = error.message;
  });

  queue.enqueue(() => Promise.reject(new Error('promise error')));
  await queue.start();
  expect(reason).toBe('promise error');

  queue.enqueue(() => {
    throw new Error('error');
  });
  await queue.start();
  expect(reason).toBe('error');
});
