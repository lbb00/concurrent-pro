export interface PriorityQueueNode<T> {
    id: number;
    value: T;
    priority: number;
}
export declare function createMaxPriorityQueue<T>(): {
    size: () => number;
    shift: () => PriorityQueueNode<T>;
    insert: (value: any, priority: number) => PriorityQueueNode<T>;
    remove: (node: PriorityQueueNode<T>) => void;
};
