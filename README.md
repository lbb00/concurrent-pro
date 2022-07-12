# concurrent-pro

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
