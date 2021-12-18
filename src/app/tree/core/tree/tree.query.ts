import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { filter, Observable, switchMap } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { ITreeState } from "../../models/tree.state";
import { TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState, INodeState, string> {
    constructor(store: TreeStore) {
        super(store);
    }

    selectChildrenNodes(id: string): Observable<INodeState[]> {
        return this.selectEntity(id, (node) => node?.children).pipe(
            filter((childrenIds) => childrenIds != null),
            switchMap((childrenIds) => this.selectMany(childrenIds!))
        );
    }

    getChildrenNodes(id: string): INodeState[] | undefined {
        return this.getEntity(id)
            ?.children?.map((childId) => this.getEntity(childId)!)
            .filter(Boolean);
    }

    selectParentNode(id: string): Observable<INodeState | undefined> {
        return this.selectEntity(
            id,
            (node) => node?.path[node.path.length - 1]
        ).pipe(
            filter((parentId) => parentId != null),
            switchMap((parentId) => this.selectEntity(parentId!))
        );
    }

    getParentNode(id: string): INodeState | undefined {
        const node = this.getEntity(id);
        if (node == null) return undefined;

        const parentId = node.path[node.path.length - 1];
        return this.getEntity(parentId);
    }

    getNodesWithFlag(flag: keyof Flags, value: boolean = true): INodeState[] {
        return this.getAll({ filterBy: (node) => node.flags[flag] == value });
    }

    selectNodesWithFlag(flag: keyof Flags, value: boolean = true): Observable<INodeState[]> {
        return this.selectAll({ filterBy: (node) => node.flags[flag] == value });
    }
}
