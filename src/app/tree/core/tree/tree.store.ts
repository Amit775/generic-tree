import { Injectable } from "@angular/core";
import { EntityState, EntityStore, HashMap, StoreConfig } from "@datorama/akita";

export interface SubTree {
	id: string;
	parentId?: string | undefined;
	children?: string[] | undefined;
	isExpanded: boolean;
}

const defaultSubTree: SubTree = {
	id: '',
	parentId: undefined,
	children: undefined,
	isExpanded: false,
}

export function createSubTree(subTree: Partial<SubTree>): SubTree {
	if (subTree?.id == null) throw 'id must be specified!';
	return { ...defaultSubTree, ...subTree };
}

export interface ITreeState extends EntityState<SubTree, SubTree['id']> {
	selected: HashMap<boolean>;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tree' })
export class TreeStore extends EntityStore<ITreeState> {
	constructor() { super({ selected: {} }); }

	public clearSelected(): void {
		this.update({ selected: {} });
	}

	public setIsSelected(nodeId: string, isSelected: boolean, single: boolean): void {
		this.update((state: ITreeState) => {
			const { [nodeId]: current, ...others } = single ? {} : state.selected;
			return {
				...state,
				selected: isSelected ? { ...others, [nodeId]: true } : { ...others }
			};
		});
	}

	public setIsExpanded(nodeId: string, isExpanded: boolean): void {
		this.update(nodeId, { isExpanded });
	}
}