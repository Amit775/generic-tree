import { Injectable } from "@angular/core";
import { applyTransaction } from "@datorama/akita";
import { Observable } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { NodesStore } from "../nodes/nodes.store";
import { NodeQuery } from "./node.query";
import { NodeStore } from "./node.store";

@Injectable()
export class NodeService {
	constructor(
		private query: NodeQuery,
		private store: NodeStore,
		private nodesStore: NodesStore
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

	toggleFlag(flag: keyof Flags, single: boolean = false): void {
		applyTransaction(() => {
			if (single) {
				this.nodesStore.update(node => node.flags[flag] === true, this.updateFlag(flag, false))
			}

			this.store.update(this.updateFlag(flag, !this.getNode().flags[flag]));
		});
	}

	selectFlag(flag: keyof Flags): Observable<boolean | undefined> {
		return this.query.select(node => node?.flags[flag]);
	}

	WithinSingleUpdate<T>(action: () => T): T {
		return applyTransaction(action);
	}

	private updateFlag(flag: keyof Flags, value: boolean): (node: INodeState) => INodeState {
		return (node: INodeState) => ({
			...node,
			flags: {
				...node.flags,
				[flag]: value || undefined
			}
		})
	}
}