import { Injectable, isDevMode } from "@angular/core";
import { distinctUntilChanged, map, Observable } from "rxjs";
import { TreeQuery } from "../../core/tree/tree.query";
import { TreeStore } from "../../core/tree/tree.store";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";



@Injectable()
export class NodeService {
    constructor(private store: TreeStore, private query: TreeQuery) { }
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

    selectFlag(flag: keyof Flags): Observable<boolean> {
        this.assertInitialized();
        return this.query.selectEntity(this._id!).pipe(
            map(node => node!.flags[flag]),
            distinctUntilChanged()
        )
    };

    selectNode(): Observable<INodeState> {
        this.assertInitialized();
        return this.query.selectEntity(this._id!) as Observable<INodeState>;
    }

    getNode(): INodeState {
        const node = this.query.getEntity(this._id!);
        if (node == null) throw `not found with id - ${this._id}`;

        return node;
    }


    private assertInitialized(): void {
        if (!isDevMode) return;
        if (!this._id) throw 'service must be initialized first';
    }
}