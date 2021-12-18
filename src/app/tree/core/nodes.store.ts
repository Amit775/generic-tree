import { Injectable } from '@angular/core';
import {
  Query,
  Store,
  EntityStore,
  QueryEntity,
  EntityState,
} from '@datorama/akita';
import { INodeState } from './tree.store';


export interface INodeEntityState extends EntityState<{}, string> {}

export interface StoreQuery<S = unknown> {
  store: Store<S>;
  query: Query<S>;
}

export interface EntityStoreQuery<S extends EntityState> {
  store: EntityStore<S>;
  query: QueryEntity<S>;
}

@Injectable({ providedIn: 'root' })
export class NodesStoresService {
  private readonly stores = new Map<string, StoreQuery>();
  private readonly entitesStores = new Map<string, EntityStoreQuery<INodeEntityState>>();

  constructor() {}

  createNodeStore<State>(id: string, initialState: State) {
    const store = new Store<INodeState>(initialState, { name: `node-${id}` });
    const query = new Query(store);

    const state = { store, query };
    this.stores.set(id, state);

    return state;
  }

  createNodeEntityStore<S extends EntityState>(id: string, initialState: S) {
    const store = new EntityStore<S>(initialState, { name: `node-${id}` });
    const query = new QueryEntity<S>(store);

    const state = { store, query };
    this.entitesStores.set(id, state);
  }

  getNodeStore<State>(id: string): StoreQuery<State> {
    return this.stores.get(id)! as StoreQuery<State>;
  }

  getNodeEntityStore<State>(id: string): EntityStoreQuery<State> {
      return this.entitesStores.get(id)! as EntityStoreQuery<State>;
  }
}
