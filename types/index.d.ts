import { PriorityQueueNode } from './PriorityQueue';
interface NodeValue<T> {
    fn: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
}
export declare function createConcurrent({ limit, defaultPriority, }?: {
    limit?: number;
    defaultPriority?: number;
}): {
    execute: <T>(asyncFn: () => Promise<T>, priority?: number) => [Promise<T>, PriorityQueueNode<NodeValue<T>>];
};
export {};
