import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { INodesState, DataStore } from "./nodes.store";

@Injectable({ providedIn: 'root' })
export class DataQuery extends QueryEntity<INodesState, INodeState, string> {
	constructor(store: DataStore) { super(store); }

	getNodesWithFlag(flag: keyof Flags, value: boolean = true): INodeState[] {
	    return this.getAll({ filterBy: (node) => node.flags[flag] == value });
	}

	selectNodesWithFlag(flag: keyof Flags, value: boolean = true): Observable<INodeState[]> {
	    return this.selectAll({ filterBy: (node) => node.flags[flag] == value });
	}
}
