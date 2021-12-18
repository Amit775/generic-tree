import { Injectable } from "@angular/core";
import { INodeState, TreeQuery, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeService {
    constructor(private store: TreeStore, private query: TreeQuery) { }

    setNodes(nodes: INodeState[]): void {
        this.store.set(nodes);
    }

    addNodes(nodes: INodeState[]): void {
        this.store.add(nodes);
    }
}