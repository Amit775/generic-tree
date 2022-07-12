import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { INodeState } from '../../models/node.state';

export interface INodesState extends EntityState<INodeState, string> { 
	active: string[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nodes' })
export class NodesStore extends EntityStore<INodesState, INodeState, string> {
	constructor() { super(); }
}
