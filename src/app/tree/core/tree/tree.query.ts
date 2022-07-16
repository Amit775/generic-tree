import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { ITreeState, SubTree, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState> {
	constructor(store: TreeStore) { super(store); }

	selectNodesIds(): Observable<string[]> {
		return this.select(e => e.ids!.slice(1));
	}

	getNodePath(nodeId: string): string[] {
		const parentId = this.getEntity(nodeId)!.parentId;
		return parentId ? [...this.getNodePath(parentId), parentId] : [];
	}

	selectNodePath(nodeId: string): Observable<string[]> {
		return this.selectEntity(nodeId, node => node?.parentId).pipe(
			switchMap((parentId) => parentId == null ? of([]) : this.selectNodePath(parentId)),
			map(path => [...path, nodeId]),
		)
	}

	getDescendetsIds(nodeId: string): string[] {
		const children = this.getEntity(nodeId)?.children;
		return [...children ?? [], ...children?.flatMap(n => this.getDescendetsIds(n)) ?? []]
	}

	selectVisibleChildrenIds(nodeId: string = 'root'): Observable<string[]> {
		const selectChildren = (childId: string): string[][] => {
			const node = this.getEntity(childId)!;
			if (node.isExpanded && node.children) return node.children.map(c => selectChildren(c)).flatMap(x => x)
			else return []
		}

		return of(selectChildren(nodeId)).pipe(
			map((childrens: string[][]) => childrens.flatMap(x => x))
		)
	}

	getParentNode(nodeId: string): SubTree | undefined {
		const node = this.getEntity(nodeId)!;
		return node.parentId ? this.getEntity(node.parentId): undefined;
	}

	isExpanded(nodeId: string): boolean {
		return this.getEntity(nodeId)!.isExpanded;
	}

	isExpanded$(nodeId: string): Observable<boolean> {
		return this.selectEntity(nodeId, e => e!.isExpanded);
	}
	
	isVisible$(nodeId: string): Observable<boolean>  {
		return this.selectNodePath(nodeId).pipe(map(path => path.slice(0, -1).every(p => this.isExpanded(p))));
	}
}