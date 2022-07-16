import { Injectable } from "@angular/core";
import { UpdateStateCallback } from "@datorama/akita";
import { INodeState } from "../../models/node.state";
import { NodesStore } from "./nodes.store";

@Injectable({ providedIn: 'root' })
export class NodesService {
	constructor(
		private store: NodesStore,
	) { }

	setNodes(nodes: INodeState[]): void {
		this.store.set(nodes);
	}

	addNodes(nodes: INodeState[]): void {
		this.store.add(nodes);
	}

	updateNodeName(nodeId: string, name: string): void {
		this.store.update(nodeId, e => ({ ...e, data: { ...e.data, display: name }}))
	}

	updateMultiNodes(nodeIds: string[], update: UpdateStateCallback<INodeState>): void {
		this.store.update(nodeIds, update);
	}
}