import { createConcurrent } from '../src/index'

function writToArr(i: number, arr: Array<number>): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      arr.push(i)
      resolve(i)
    }, 0)
  })
}

it('test concurrent.execute with default options', async () => {
  const concurrent = createConcurrent()
  const arr = []
  const [p1] = concurrent.execute(() => writToArr(1, arr))
  const [p2] = concurrent.execute(() => writToArr(2, arr))
  const [p3] = concurrent.execute(() => writToArr(3, arr), 1)
  const [p4] = concurrent.execute(() => writToArr(4, arr), 1)
  await Promise.all([p1, p2, p3, p4])
  expect(arr).toEqual([1, 2, 3, 4])
})

it('test concurrent.execute', async () => {
  const concurrent = createConcurrent({
    limit: 2,
    defaultPriority: 1,
  })
  const arr = []
  const [p1] = concurrent.execute(() => writToArr(1, arr))
  const [p2] = concurrent.execute(() => writToArr(2, arr))
  const [p3] = concurrent.execute(() => writToArr(3, arr), 0)
  const [p4] = concurrent.execute(() => writToArr(4, arr), 2)
  await Promise.all([p1, p2, p3, p4])
  expect(arr).toEqual([1, 2, 4, 3])
})

it('test concurrent.execute reject', async () => {
  const concurrent = createConcurrent({
    limit: 2,
  })
  const arr = []
  const [p1] = concurrent.execute<string>(() => Promise.reject('error'))
  const [p2] = concurrent.execute(() => writToArr(1, arr))
  const [r1, r2] = await Promise.allSettled([p1, p2])
  expect(r1).toStrictEqual({ status: 'rejected', reason: 'error' })
  expect(r2).toStrictEqual({ status: 'fulfilled', value: 1 })
  expect(arr).toEqual([1])
})
