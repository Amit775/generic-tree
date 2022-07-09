import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface SubTree {
	id: string;
	parentId: string | null;
	children: string[] | undefined;
}

export interface ITreeState extends EntityState<SubTree> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tree' })
export class TreeStore extends EntityStore<ITreeState> {
	constructor() { super(); }
}