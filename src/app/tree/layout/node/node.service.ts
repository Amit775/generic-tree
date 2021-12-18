import { Injectable } from "@angular/core";
import { TreeStore } from "../../core/tree/tree.store";

@Injectable()
export class NodeService  {

    constructor(private store: TreeStore) { }
    private _id: string | undefined;

    init(id: string): void {
        if (this._id != null) throw 'initialized twice ' + id;
        this._id = id;
    }

    toggleExpand(): void {
        this.assertInitialized();
        this.store.update(this._id!, node => ({
            ...node,
            flags: {
                ...node.flags,
                expanded: !node.flags['expanded']
            }
        }))
    }

    private assertInitialized(): void {
        if (!this._id) throw 'service must be initialized first';
    }
}