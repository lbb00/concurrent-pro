import { createConcurrent } from '../src/index'

function writToArr(i: number, arr: Array<number>): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      arr.push(i)
      resolve(i)
    }, 0)
  })
}

it('test concurrent.execute', async () => {
  const concurrent = createConcurrent({
    limit: 2,
  })
  const arr = []
  const [p1] = concurrent.execute(() => writToArr(1, arr))
  const [p2] = concurrent.execute(() => writToArr(2, arr))
  const [p3] = concurrent.execute(() => writToArr(3, arr))
  const [p4] = concurrent.execute(() => writToArr(4, arr), 1)
  await Promise.all([p1, p2, p3, p4])
  expect(arr).toEqual([1, 2, 4, 3])
})
