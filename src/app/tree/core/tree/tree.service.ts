import { Injectable } from "@angular/core";
import { TreeStore } from "./tree.store";
import { TreeQuery } from "./tree.query";
import { INodeState } from "../../models/node.state";

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