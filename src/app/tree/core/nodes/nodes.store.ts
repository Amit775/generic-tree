import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { INodeState } from '../../models/node.state';
import { INodesState } from '../../models/tree.state';


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nodes' })
export class NodesStore extends EntityStore<INodesState, INodeState, string> {
  constructor() {
    super();
  }
}
