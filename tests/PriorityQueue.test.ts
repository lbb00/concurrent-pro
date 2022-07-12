import { createMaxPriorityQueue } from '../src/PriorityQueue'

it('test insert (1,1) then shift all', () => {
  const queue = createMaxPriorityQueue<number>()
  queue.insert(1, 1)
  expect(queue.size()).toEqual(1)
  expect(queue.shift()?.value).toEqual(1)
  expect(queue.size()).toEqual(0)
})

it('test insert (1,1) then remove it', () => {
  const queue = createMaxPriorityQueue<number>()
  const node = queue.insert(1, 1)
  expect(queue.size()).toEqual(1)
  queue.remove(node)
  expect(queue.size()).toEqual(0)
})

it('test insert (1,1),(2,2),(3,3) then shift all', () => {
  const queue = createMaxPriorityQueue<number>()
  queue.insert(1, 1)
  queue.insert(2, 2)
  queue.insert(3, 3)
  expect(queue.size()).toEqual(3)
  const arr: Array<number | undefined> = []
  for (let i = 0; i < 3; i++) {
    arr.push(queue.shift()?.value)
  }
  expect(arr).toEqual([3, 2, 1])
  expect(queue.size()).toEqual(0)
})

it('test insert (1,1),(2,2),(3,3),(4,2) then shift all', () => {
  const queue = createMaxPriorityQueue<number>()
  queue.insert(1, 1)
  queue.insert(2, 2)
  queue.insert(3, 3)
  queue.insert(4, 2)
  expect(queue.size()).toEqual(4)
  const arr: Array<number | undefined> = []
  for (let i = 0; i < 4; i++) {
    arr.push(queue.shift()?.value)
  }
  expect(arr).toEqual([3, 2, 4, 1])
  expect(queue.size()).toEqual(0)
})

it('test insert (1,1),(2,2),(3,3),(4,2),(5,2),(6,2)(7,3)(8,1)(9,2) then remove(5,2),(8,1) shift all', () => {
  const queue = createMaxPriorityQueue<number>()
  queue.insert(1, 1)
  queue.insert(2, 2)
  queue.insert(3, 3)
  queue.insert(4, 2)
  const r1 = queue.insert(5, 2)
  queue.insert(6, 2)
  queue.insert(7, 3)
  const r2 = queue.insert(8, 1)
  queue.insert(9, 2)
  expect(queue.size()).toEqual(9)
  queue.remove(r1)
  expect(queue.size()).toEqual(8)
  queue.remove(r2)
  expect(queue.size()).toEqual(7)
  const arr: Array<number | undefined> = []
  for (let i = 0; i < 7; i++) {
    arr.push(queue.shift()?.value)
  }
  expect(arr).toEqual([3, 7, 2, 4, 6, 9, 1])
  expect(queue.size()).toEqual(0)
})
