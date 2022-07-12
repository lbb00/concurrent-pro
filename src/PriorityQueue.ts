export interface PriorityQueueNode<T> {
  id: number
  value: T
  priority: number
}

export function createMaxPriorityQueue<T>() {
  let ids = 1
  const queue: PriorityQueueNode<T>[] = []

  function size() {
    return queue.length
  }

  function shift() {
    if (queue.length === 0) {
      return
    }
    const node = queue[0]
    remove(node)
    return node
  }

  function insert(value: any, priority: number) {
    const node: PriorityQueueNode<T> = {
      id: ids,
      value,
      priority,
    }
    ids = ids + 1
    queue.push(node)
    peekUp(queue.length - 1)
    return node
  }

  function remove(node: PriorityQueueNode<T>) {
    const index = queue.indexOf(node)
    if (index === -1) {
      return
    }
    if (index === queue.length - 1) {
      queue.pop()
      return
    }

    queue[index] = queue.pop()
    peekDown(index)
  }

  function peekUp(i: number) {
    if (i === 0) {
      return
    }
    const parent = Math.floor((i - 1) / 2)
    if (
      queue[parent].priority < queue[i].priority ||
      (queue[parent].priority === queue[i].priority &&
        queue[parent].id > queue[i].id)
    ) {
      ;[queue[parent], queue[i]] = [queue[i], queue[parent]]
      peekUp(parent)
    }
  }

  function peekDown(i: number) {
    while (true) {
      const left = i * 2 + 1
      const right = i * 2 + 2
      let max = i
      if (left < queue.length) {
        if (
          queue[left].priority > queue[max].priority ||
          (queue[left].priority === queue[max].priority &&
            queue[left].id < queue[max].id)
        ) {
          max = left
        }
      }

      if (right < queue.length) {
        if (
          queue[right].priority > queue[max].priority ||
          (queue[right].priority === queue[max].priority &&
            queue[right].id < queue[max].id)
        ) {
          max = right
        }
      }

      if (max === i) return
      ;[queue[i], queue[max]] = [queue[max], queue[i]]
      i = max
    }
  }

  return {
    size,
    shift,
    insert,
    remove,
  }
}
