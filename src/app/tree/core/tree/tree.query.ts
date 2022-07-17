import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { map, Observable, of, switchMap } from "rxjs";
import { ITreeState, SubTree, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeQuery extends QueryEntity<ITreeState> {
	constructor(store: TreeStore) { super(store); }

	public getNodePath(nodeId: string): string[] {
		const parentId = this.getEntity(nodeId)!.parentId;
		return parentId ? [...this.getNodePath(parentId), parentId] : [];
	}

	public selectNodePath(nodeId: string): Observable<string[]> {
		return this.selectEntity(nodeId, node => node?.parentId).pipe(
			switchMap((parentId) => parentId == null ? of([]) : this.selectNodePath(parentId)),
			map(path => [...path, nodeId]),
		)
	}

	public getDescendetsIds(nodeId: string): string[] {
		const children = this.getEntity(nodeId)?.children;
		return [...children ?? [], ...children?.flatMap(n => this.getDescendetsIds(n)) ?? []]
	}

	public getParentNode(nodeId: string): SubTree | undefined {
		const node = this.getEntity(nodeId)!;
		return node.parentId ? this.getEntity(node.parentId) : undefined;
	}

	public isExpanded(nodeId: string): boolean {
		return this.getEntity(nodeId)!.isExpanded;
	}

	public isExpanded$(nodeId: string): Observable<boolean> {
		return this.selectEntity(nodeId, e => e!.isExpanded);
	}

	public isSelected(nodeId: string): boolean {
		return this.getValue().selected[nodeId] || false;
	}

	public isSelected$(nodeId: string): Observable<boolean> {
		return this.select((state: ITreeState) => state.selected[nodeId] || false);
	}

	public getSelectedIds(): string[] {
		return Array.from(Object.keys(this.getValue().selected))
	}
}