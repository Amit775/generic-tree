import { Observable } from "rxjs";

export type Eventually<T> = T | (() => T) | Promise<T> | Observable<T>;

export interface ITreeOptions {
    fields: {
        display: Eventually<string>
    }
}

export class TreeNode<T = any> {
    public path: TreeNode[] = [];
    public children: TreeNode[] = [];
    constructor(
        public data: T,
        public parent: TreeNode
    ) {
        this.path = [...parent.path, parent];
        this.children = this.getField<TreeNode[]>('children');
    }

    getField<V>(key: string): V {
        return (this.data as any)[key] as V;
    }
}