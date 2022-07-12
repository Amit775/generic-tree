import { Injectable } from "@angular/core";
import { applyTransaction, HashMap } from "@datorama/akita";
import { SubTree, TreeStore } from "./tree.store";

export interface NodeIndexInParent {
	parent: SubTree;
	index: number;
}
@Injectable({ providedIn: 'root' })
export class TreeService {
	constructor(private store: TreeStore) { }

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
}