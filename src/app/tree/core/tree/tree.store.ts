import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { INodeState } from '../../models/node.state';
import { ITreeState } from '../../models/tree.state';


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tree' })
export class TreeStore extends EntityStore<ITreeState, INodeState, string> {
  constructor() {
    super();
  }
}
