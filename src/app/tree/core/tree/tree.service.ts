import { Injectable } from "@angular/core";
import { TreeStore } from "./tree.store";
import { TreeQuery } from "./tree.query";
import { INodeState } from "../../models/node.state";

@Injectable({ providedIn: 'root' })
export class TreeService {
    constructor(private store: TreeStore, private query: TreeQuery) { }
    public virtualRoot!: INodeState;

    setNodes(nodes: INodeState[]): void {
        this.store.set(nodes);
    }

    addNodes(nodes: INodeState[]): void {
        this.store.add(nodes);
    }

    moveNode(node: INodeState, toParent: INodeState): void {
        if (node.path.includes(toParent)) return;

        const fromParent = node.path[node.path.length - 1];
        const fromChildren = node.children;
        const fromIndex = fromChildren!.indexOf(node);

        return 
    }

}