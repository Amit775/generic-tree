import { Injectable } from "@angular/core";
import { Query, Store } from "@datorama/akita";
import { Flags } from "../models/flags.model";
import { IIndicator } from "../models/indicator.model";

export class TreeNode<T = any> {
	constructor(
		private state: TreeNodeState<T>,
		private store: TreeStore<T>,
		private query: Query<TreeState<T>>
	) { }

	doForAll(action: (state: TreeState) => TreeState): void {
		this.store.update(action);
		this.query.getValue().children?.forEach(child => child.doForAll(action));
	}
}


@Injectable({ providedIn: 'root' })
export class SuperStoreService {
	private _stores: Map<string, TreeNode> = new Map();

	createStore<T>(nodeState: TreeNodeState, treeState: TreeState): TreeNode<T> {
		const store = new TreeStore(treeState);
		const query = new Query(store);

		const treeNode = new TreeNode<T>(nodeState, store, query);
		this._stores.set(nodeState.id, treeNode);

		return treeNode;
	}
}

export interface TreeNodeState<T = any> {
	id: string;
	flags: Partial<Flags>;
	data: T;
	indicators?: IIndicator[];
}

export interface TreeState<T = any> {
	root: TreeNode<T>;
	children: TreeNode[];
	path: TreeNode[];
}

export class TreeStore<T> extends Store<TreeState<T>> {
	constructor(initialState: Partial<TreeState<T>>) { super(initialState) }
}