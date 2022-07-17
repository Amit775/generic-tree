import { Injectable } from "@angular/core";
import { applyTransaction, UpdateStateCallback } from "@datorama/akita";
import { Observable } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { NodeQuery } from "./node.query";
import { NodeStore } from "./node.store";

@Injectable()
export class NodeService {
	constructor(
		public query: NodeQuery,
		private store: NodeStore,
	) { }

	private _id!: string;
	singleFlags: { [flag: keyof Flags]: boolean } = { active: true };

	init(id: string): void {
		this._id = id;
		this.store.id = id;
		this.query.id = id;
	}

	getNode(): INodeState {
		return this.query.get();
	}

	selectNode(): Observable<INodeState> {
		return this.query.select();
	}

	selectFlag(flag: keyof Flags): Observable<boolean | undefined> {
		return this.query.select(node => node?.flags[flag]);
	}

	WithinSingleUpdate<T>(action: () => T): T {
		return applyTransaction(action);
	}

	toggleExpand(): void {
		const currentIsExpanded = this.query.isExpanded();
		this.store.setIsExpanded(!currentIsExpanded);
	}

	toggleSelected(single: boolean): void {
		const currentIsSelected = this.query.isSelected();
		this.setIsSelected(!currentIsSelected, single);
	}

	setIsSelected(isSelected: boolean, single: boolean): void {
		this.store.setIsSelected(isSelected, single);
	}

	private updateFlag(flag: keyof Flags, value: boolean): UpdateStateCallback<INodeState> {
		return (node: INodeState) => ({
			...node,
			flags: {
				...node.flags,
				[flag]: value || undefined
			}
		})
	}
}