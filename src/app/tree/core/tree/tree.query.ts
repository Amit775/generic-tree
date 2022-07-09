import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { INodeState } from "../../models/node.state";
import { NodesQuery } from "../nodes/nodes.query";
import { ITreeState, SubTree, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState> {
	constructor(
		store: TreeStore,
		private nodesQuery: NodesQuery,
	) { super(store); }

	selectChildrenOfNode(nodeId: string): Observable<INodeState[]> {
		const childrenIds = this.getEntity(nodeId)?.children || [];
		return this.nodesQuery.selectMany(childrenIds);
	}
}