# concurrent-pro

[![Npm](https://badgen.net/npm/v/concurrent-pro)](https://www.npmjs.com/package/concurrent-pro)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/concurrent-pro)](https://bundlephobia.com/result?p=concurrent-pro)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/concurrent-pro.svg)](https://codecov.io/gh/lbb00/concurrent-pro)
[![License](https://img.shields.io/github/license/lbb00/concurrent-pro.svg)](https://github.com/lbb00/concurrent-pro/blob/master/LICENSE)
[![License](https://img.shields.io/npm/dt/concurrent-pro.svg)](https://www.npmjs.com/package/concurrent-pro)

Limit and prioritize the concurrency.

## Usage

```typescript
import { createConcurrent } from 'concurrent-pro'

function writToArr(i: number, arr: Array<number>): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      arr.push(i)
      resolve(i)
    }, 0)
  })
}

const concurrent = createConcurrent({
  limit: 1, // Only one promise is run at once
})

const arr = []
const [p1] = concurrent.execute(() => writToArr(1, arr))
const [p2] = concurrent.execute(() => writToArr(2, arr))
// High priority
const [p3] = concurrent.execute(() => writToArr(3, arr), 1)

await Promise.all([p1, p2, p3])

console.log(arr) // -> [1,3,2]
```

## Api

### createConcurrent(options)

- options
  - options.limit `number` default is Infinity.
  - options.defaultPriority `number` default is 0.

### concurrent.execute(fn ,priority)

- fn `() => Promise<T>`
- priority `number` default is options.defaultPriority
