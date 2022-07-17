import { Injectable } from "@angular/core";
import { INodeState } from "../../models/node.state";
import { DataQuery } from "./nodes.query";
import { DataStore } from "./nodes.store";

@Injectable({ providedIn: 'root' })
export class DataService {
	constructor(
		private dataStore: DataStore,
		public dataQuery: DataQuery,
	) { }

	setNodes(nodes: INodeState[]): void {
		this.dataStore.set(nodes);
	}

	addNodes(nodes: INodeState[]): void {
		this.dataStore.add(nodes);
	}

	updateNodeName(nodeId: string, name: string): void {
		this.dataStore.update(nodeId, e => ({ ...e, data: { ...e.data, display: name }}))
	}
}