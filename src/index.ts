import { createMaxPriorityQueue, PriorityQueueNode } from './PriorityQueue'

interface NodeValue<T> {
  fn: () => Promise<T>
  resolve: (value: T) => void
  reject: (error: Error) => void
}

export function createConcurrent({
  limit = Infinity,
  defaultPriority = 0,
}: { limit?: number; defaultPriority?: number } = {}) {
  const waitQueue = createMaxPriorityQueue<NodeValue<any>>()
  const executingQueue: PriorityQueueNode<NodeValue<any>>[] = []

  function execute<T>(
    asyncFn: () => Promise<T>,
    priority: number = defaultPriority
  ): [Promise<T>, PriorityQueueNode<NodeValue<T>>] {
    const node = waitQueue.insert(
      {
        fn: asyncFn,
      },
      priority
    )
    const p = new Promise<T>((resolve, reject) => {
      node.value.resolve = resolve
      node.value.reject = reject
      execNext()
    })

    return [p, node]
  }

  async function execNext() {
    if (executingQueue.length >= limit || waitQueue.size() === 0) {
      return
    }
    const node = waitQueue.shift()
    if (node) {
      try {
        executingQueue.push(node)
        node.value.resolve(await node.value.fn())
      } catch (e) {
        node.value.reject(e)
      }
      executingQueue.splice(executingQueue.indexOf(node), 1)
      execNext()
    }
  }

  return {
    execute,
  }
}
