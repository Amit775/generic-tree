// import { Injectable } from '@angular/core';
// import { EntityState } from '@datorama/akita';
// import { createState, Store } from '@ngneat/elf';
// import { addEntities, deleteEntities, selectEntity, selectMany, selectAll, setEntities, updateEntities, withEntities, selectAllApply } from '@ngneat/elf-entities';
// import { map, Observable, switchMap, switchMapTo } from 'rxjs';
// import { INodeState } from '../../models/node.state';

// const { state, config } = createState(withEntities<INodeState>());
// const store = new Store({ name: 'nodes', state, config });

// export function selectNode<T extends EntityState>(id: string) {
//   return function (source: Observable<T>) {
//     return source.pipe(map(w => w.))
//   }
// }

// @Injectable({ providedIn: 'root' })
// export class NodesRepository {
//   nodes$ = store.pipe(selectAll());

//   selectMany(ids: string[]): Observable<INodeState[]> {
//     return store.pipe(selectMany(ids));
//   }

//   selectChildrenIds(id: string): Observable<string[]> {
//     return store.pipe(selectEntity(id))
//   }

//   selectChildrenNodes(id: string): Observable<INodeState[]> {
//     return store.pipe(
//       selectEntity(id, { pluck: (node: INodeState) => node.children}),
//       switchMap((childrenIds: string[]) => store.pipe.selectMany(childrenIds))
//     );
//   }

//   setNodes(nodes: INodeState[]) {
//     store.update(setEntities(nodes));
//   }

//   addNode(node: INodeState) {
//     store.update(addEntities(node));
//   }

//   updateNode(id: INodeState['id'], node: Partial<INodeState>) {
//     store.update(updateEntities(id, node));
//   }

//   deleteNode(id: INodeState['id']) {
//     store.update(deleteEntities(id));
//   }
// }
