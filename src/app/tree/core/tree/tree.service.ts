import { Injectable } from "@angular/core";
import { HashMap } from "@datorama/akita";
import { SubTree, TreeStore } from "./tree.store";

@Injectable({ providedIn: 'root' })
export class TreeService {
	constructor(private store: TreeStore) { }
	
	public setSubTrees(subTrees: HashMap<SubTree>) {
		this.store.set(subTrees);
	}
}