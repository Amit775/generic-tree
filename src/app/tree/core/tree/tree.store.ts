import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { INodeState } from "../../models/node.state";

export interface SubTreeNode<T> {
	node: T;
	children: T[];
}

export interface SubTree {
	id: string;
	parentId: string | null;
	children: string[] | undefined;
}

export interface ITreeState<T = INodeState> extends EntityState<SubTree> {
	root: SubTreeNode<T>;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tree' })
export class TreeStore extends EntityStore<ITreeState> {
	constructor() { super(); }
}