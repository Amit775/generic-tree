import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, Observable, of, switchMap } from "rxjs";
import { ITreeState, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState> {
	constructor(store: TreeStore) { super(store); }

	getNodePath(nodeId: string): string[] {
		const parentId = this.getEntity(nodeId)!.parentId;
		return parentId ? [...this.getNodePath(parentId), parentId] : [];
	}

	selectNodePath(nodeId: string): Observable<string[]> {
		return this.selectEntity(nodeId, node => node?.parentId).pipe(
			switchMap((parentId) => parentId == null ? of([]) : this.selectNodePath(parentId)),
			map(path => [...path, nodeId])
		)
	}

	getDescendetsIds(nodeId: string): string[] {
		const children = this.getEntity(nodeId)?.children;
		return [...children ?? [], ...children?.flatMap(n => this.getDescendetsIds(n)) ?? []]
	}
}