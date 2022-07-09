import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { NodesQuery } from "../nodes/nodes.query";
import { ITreeState, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState> {
	constructor(store: TreeStore) { super(store); }

	getNodePath(nodeId: string): string[] {
		const parentId = this.getEntity(nodeId)!.parentId;
		return parentId ? [...this.getNodePath(parentId), parentId] : [];
	}
}