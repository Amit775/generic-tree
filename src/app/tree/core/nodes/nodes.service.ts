import { Injectable } from "@angular/core";
import { NodesStore } from "./nodes.store";
import { NodesQuery } from "./nodes.query";
import { INodeState } from "../../models/node.state";

@Injectable({ providedIn: 'root' })
export class NodesService {
    constructor(private store: NodesStore, private query: NodesQuery) { }

    setNodes(nodes: INodeState[]): void {
        this.store.set(nodes);
    }

    addNodes(nodes: INodeState[]): void {
        this.store.add(nodes);
    }
}