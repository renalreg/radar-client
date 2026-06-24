import firstPromiseFactory from '../src/app/utils/first-promise';

// minimal AngularJS $q mock
const $q = {
  all: Promise.all.bind(Promise),

  defer() {
    let resolve, reject;

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return {
      promise,
      resolve,
      reject,
    };
  },
};

const firstPromise = firstPromiseFactory($q);

describe('firstPromise', () => {
  test('resolves to undefined for an empty list', async () => {
    await expect(firstPromise([])).resolves.toBeUndefined();
  });

  test('resolves to the value of a single promise', async () => {
    await expect(firstPromise([Promise.resolve(42)])).resolves.toBe(42);
  });

  test('resolves to the value of the first promise to settle', async () => {
    let resolveFirst;

    const first = new Promise((res) => {
      resolveFirst = res;
    });

    const second = Promise.resolve(999); // never resolves

    const result = firstPromise([first, second]);

    resolveFirst(123);

    await expect(result).resolves.toBe(123);
  });
});
