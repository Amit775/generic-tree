import { Injectable } from "@angular/core";
import { applyTransaction, HashMap, UpdateStateCallback } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { TreeQuery } from "./tree.query";
import { SubTree, TreeStore } from "./tree.store";

export interface NodeIndexInParent {
	parent: SubTree;
	index: number;
}
@Injectable({ providedIn: 'root' })
export class TreeService {
	constructor(
		private treeStore: TreeStore,
		public treeQuery: TreeQuery,
	) { }

	public setSubTrees(subTrees: HashMap<SubTree>) {
		this.treeStore.set(subTrees);
	}

	public visibleChildren$(): Observable<string[]> {
		return this.treeQuery.select().pipe(map(s => {
			const result: string[] = []
			const getChildren = (id: string) => {
				result.push(id);
				const entity = s.entities![id];
				if (entity.isExpanded) {
					entity.children?.forEach(getChildren)
				}
			}
			s.entities!['root'].children?.forEach(getChildren);

			return result;
		}))
	}

	public addNode(subTree: SubTree): void {
		applyTransaction(() => {
			this.treeStore.add(subTree);
			this.treeStore.update(subTree.parentId!, e => ({ ...e, children: [...e.children ?? [], subTree.id] }))
		});
	}

	public moveNode(node: SubTree, from: NodeIndexInParent, to: NodeIndexInParent): void {
		applyTransaction(() => {
			this.treeStore.update(node.id, { parentId: to.parent.id });
			this.treeStore.update(from.parent.id, subTree => ({
				...subTree,
				children: [
					...subTree.children!.slice(0, from.index),
					...subTree.children!.slice(from.index + 1)
				]
			}));
			this.treeStore.update(to.parent.id, subTree => ({
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
			...this.treeQuery.getEntity(nodeId)!.children?.flatMap(id => this.getDescendentNodesIds(id)!) ?? []
		]
	}

	public removeNode(nodeId: string): void {
		const parentId = this.treeQuery.getEntity(nodeId)!.parentId!;
		const ids = this.getDescendentNodesIds(nodeId);
		applyTransaction(() => {
			this.treeStore.remove(ids);
			this.treeStore.update(parentId, subTree => ({
				...subTree,
				children: [...subTree.children?.filter(c => c !== nodeId) ?? []]
			}))

		})
	}

	updateMultiNodes(nodeIds: string[], update: UpdateStateCallback<SubTree>): void {
		this.treeStore.update(nodeIds, update);
	}

	public setIsExpanded(nodeId: string, isExpanded: boolean): void {
		this.treeStore.update(nodeId, e => ({ ...e, isExpanded }));
	}
}