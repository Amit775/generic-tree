import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { INodeState } from "../../models/node.state";
import { INodesState } from "../../models/tree.state";
import { NodesStore } from "./nodes.store";

@Injectable({ providedIn: 'root' })
export class NodesQuery extends QueryEntity<INodesState, INodeState, string> {
    constructor(store: NodesStore) {
        super(store);
    }
	
    // selectChildrenNodes(id: string): Observable<INodeState[]> {
    //     return this.selectEntity(id, (node) => node?.children ?? []);
    // }

    // getChildrenNodes(id: string): INodeState[] | undefined {
    //     return this.getEntity(id)?.children;
    // }

    // selectParentNode(id: string): Observable<INodeState | undefined> {
    //     return this.selectEntity(
    //         id,
    //         (node) => node?.path[node.path.length - 1]
    //     ).pipe(
    //         filter((parentId) => parentId != null),
    //         switchMap((parentId) => this.selectEntity(parentId!))
    //     );
    // }

    // getParentNode(id: string): INodeState | undefined {
    //     const node = this.getEntity(id);
    //     if (node == null) return undefined;

    //     const parentId = node.path[node.path.length - 1];
    //     return this.getEntity(parentId);
    // }

    // getNodesWithFlag(flag: keyof Flags, value: boolean = true): INodeState[] {
    //     return this.getAll({ filterBy: (node) => node.flags[flag] == value });
    // }

    // selectNodesWithFlag(flag: keyof Flags, value: boolean = true): Observable<INodeState[]> {
    //     return this.selectAll({ filterBy: (node) => node.flags[flag] == value });
    // }
}
