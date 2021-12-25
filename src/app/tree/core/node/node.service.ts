import { Injectable } from "@angular/core";
import { applyTransaction } from "@datorama/akita";
import { Observable } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { TreeStore } from "../tree/tree.store";
import { NodeQuery } from "./node.query";
import { NodeStore } from "./node.store";

@Injectable()
export class NodeService {
    constructor(private query: NodeQuery, private store: NodeStore, private treeStore: TreeStore) { }
    private _id!: string;
    singleFlags: { [flag: keyof Flags]: boolean } = { active: true };

    init(id: string): void {
        this._id = id;
        this.store.id = id;
        this.query.id = id;
    }

    get(): INodeState {
        return this.query.get();
    }

    toggleFlag(flag: keyof Flags, single: boolean = false): void {
        applyTransaction(() => {
            if (single) {
                this.treeStore.update(node => node.flags[flag] === true, this.updateFlag(flag, false))
            }

            this.store.update(this.updateFlag(flag, !this.get().flags[flag]));
        });
    }

    selectFlag(flag: keyof Flags): Observable<boolean | undefined> {
        return this.query.select(node => node?.flags[flag]);
    }

    withSingleTick<T>(action: () => T): T {
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