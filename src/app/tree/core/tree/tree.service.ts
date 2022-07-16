import { Injectable } from "@angular/core";
import { applyTransaction, HashMap } from "@datorama/akita";
import { BehaviorSubject, map, Observable } from "rxjs";
import { TreeQuery } from "./tree.query";
import { SubTree, TreeStore } from "./tree.store";

export interface NodeIndexInParent {
	parent: SubTree;
	index: number;
}
@Injectable({ providedIn: 'root' })
export class TreeService {
	constructor(
		private store: TreeStore,
		private query: TreeQuery,
	) { }

	public visibleChildren$(): Observable<string[]> {
		return this.query.select().pipe(map(s => {
			const result: string[] =[]
			const getChildren = (id: string) => {
				result.push(id);
				const entity = s.entities![id];
				if(entity.isExpanded) {
					entity.children?.forEach(getChildren)
				}
			}
			s.entities!['root'].children?.forEach(getChildren);

			return result;
		}))
	}

	private _visibleChildren = new BehaviorSubject<string[]>(['root']);
	public visibleChildren2$(): Observable<string[]> { return this._visibleChildren.asObservable(); }
	public addVisibleChildren(nodeId: string, ids: string[] = []): void {
		const newValue = this._visibleChildren.value;
		const index = newValue.indexOf(nodeId);
		this._visibleChildren.next([
			...newValue.slice(0, index + 1),
			...ids,
			...newValue.slice(index + 1)
		])
	}
	public removeVisibleChildren(nodeId: string, ids: string[] = []): void {
		const newValue = this._visibleChildren.value;
		const index = newValue.indexOf(nodeId);

		this._visibleChildren.next([...newValue.splice(index + 1, ids.length) ]);
	}

	public setSubTrees(subTrees: HashMap<SubTree>) {
		this.store.set(subTrees);
	}

	public addNode(subTree: SubTree): void {
		applyTransaction(() => {
			this.store.add(subTree);
			this.store.update(subTree.parentId, e => ({ ...e, children: [...e.children ?? [], subTree.id] }))
		});
	}

	public moveNode(node: SubTree, from: NodeIndexInParent, to: NodeIndexInParent): void {
		applyTransaction(() => {
			this.store.update(node.id, { parentId: to.parent.id });
			this.store.update(from.parent.id, subTree => ({
				...subTree,
				children: [
					...subTree.children!.slice(0, from.index),
					...subTree.children!.slice(from.index + 1)
				]
			}));
			this.store.update(to.parent.id, subTree => ({
				...subTree,
				children: [
					...subTree.children!.slice(0, to.index),
					node.id,
					...subTree.children!.slice(to.index)
				]
			}))
		})
	}

	public getDescendentNodesIds(nodeId: string): string[] {
		return [
			nodeId,
			...this.query.getEntity(nodeId)!.children?.flatMap(id => this.getDescendentNodesIds(id)!) ?? []
		]
	}

	public removeNode(nodeId: string): void {
		const parentId = this.query.getEntity(nodeId)!.parentId!;
		const ids = this.getDescendentNodesIds(nodeId);
		applyTransaction(() => {
			this.store.remove(ids);
			this.store.update(parentId, subTree => ({
				...subTree,
				children: [...subTree.children?.filter(c => c !== nodeId) ?? []]
			}))

		})
	}
}