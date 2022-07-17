import { Injectable } from "@angular/core";
import { UpdateStateCallback } from "@datorama/akita";
import { INodeState } from "../../models/node.state";
import { DataStore } from "../nodes/nodes.store";
import { TreeStore } from "../tree/tree.store";

@Injectable()
export class NodeStore {
	private _id!: string;
	public set id(value: string) {
		if (value == null) return;
		if (this.dataStore.getValue().entities?.[value] == null) {
			throw `Node Store for id - ${value} is not included in Data Store`;
		}
		if (this.treeStore.getValue().entities?.[value] == null) {
			throw `Node Store for id - ${value} is not included in Tree Store`;
		}
		this._id = value;
	}
	public get id(): string {
		return this._id;
	}

	constructor(
		public dataStore: DataStore,
		public treeStore: TreeStore,
	) { }

	update(updatefn: UpdateStateCallback<INodeState>): void;
	update(update: Partial<INodeState>): void;
	update(update: UpdateStateCallback<INodeState> | Partial<INodeState>): void {
		if (typeof update === 'function') {
			return this.dataStore.update(this._id, update);
		}

		return this.dataStore.update(this._id, update);
	}

	setIsSelected(isSelected: boolean, single: boolean): void {
		this.treeStore.setIsSelected(this._id, isSelected, single);
	}

	setIsExpanded(isExpanded: boolean): void {
		this.treeStore.setIsExpanded(this._id, isExpanded);
	}
}