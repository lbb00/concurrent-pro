import { PriorityQueueNode } from './PriorityQueue';
interface NodeValue<T> {
    fn: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
}
export declare function createConcurrentPool({ limit }: {
    limit: number;
}): {
    execute: <T>(asyncFn: () => Promise<T>, priority: number) => (PriorityQueueNode<NodeValue<any>> | Promise<unknown>)[];
};
export {};
