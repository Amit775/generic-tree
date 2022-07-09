import { Injectable } from "@angular/core";
import { UpdateStateCallback } from "@datorama/akita";
import { INodeState } from "../../models/node.state";
import { NodesStore } from "../nodes/nodes.store";

@Injectable()
export class NodeStore {
    private _id!: string;
    public set id(value: string) {
        if (value == null) return;
        if (this.store.getValue().entities?.[value] == null) {
            throw `Node Store for id - ${value} is not included in Tree Store`;
        }
        this._id = value;
    }
    public get id(): string {
        return this._id;
    }
    
    constructor(public store: NodesStore) { }

    update(updatefn: UpdateStateCallback<INodeState>): void;
    update(update: Partial<INodeState>): void;
    update(update: UpdateStateCallback<INodeState> | Partial<INodeState>): void {
        if (typeof update === 'function') {
            return this.store.update(this._id, update);
        }

        return this.store.update(this._id, update);
    }
}