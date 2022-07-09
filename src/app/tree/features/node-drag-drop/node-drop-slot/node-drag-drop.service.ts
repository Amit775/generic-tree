import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { applyTransaction } from "@datorama/akita";
import { BehaviorSubject } from "rxjs";
import { NodesStore } from "src/app/tree/core/nodes/nodes.store";
import { INodeState } from "src/app/tree/models/node.state";

@Injectable({ providedIn: 'root' })
export class NodeDragDropService {
    private _dragAndDrops = new BehaviorSubject<string[]>([]);
    public dragAndDrops$ = this._dragAndDrops.asObservable();

    constructor(private store: NodesStore) { }

    public register(id: string): void {
        this._dragAndDrops.next([...this._dragAndDrops.value, id]);
        console.log('registered: ', this._dragAndDrops.value);
    }
    public unregister(id: string): void {
        this._dragAndDrops.next(this._dragAndDrops.value.filter(x => x !== id));
    }

    onDragDrop(event: CdkDragDrop<INodeState, INodeState, INodeState>): void {
        const { container: parent, previousContainer: prevParent, currentIndex, previousIndex, item: draggedNode } = event;

        applyTransaction(() => {
            this.store.update(draggedNode.data.id,
                (entity: INodeState) => ({
                    ...entity,
                    path: [...parent.data.path, parent.data.id]
                })
            );

            // console.log('--- remove from prev parent ---')

            // const oldprevChildren = prevParent.data.children;
            // console.log(oldprevChildren);
            // console.log([...oldprevChildren!.slice(0, previousIndex), ...oldprevChildren!.slice(previousIndex + 1)]);
            // console.log('-------------------------------')

            this.store.update(prevParent.data.id,
                (entity: INodeState) => ({
                    ...entity,
                    children: [
                        ...entity.children!.slice(0, previousIndex),
                        ...entity.children!.slice(previousIndex + 1)
                    ]
                })
            );

            // const oldChildren = parent.data.children;
            // console.log('--- add to new parent ---')
            // console.log(oldChildren);
            // console.log([...oldChildren!.slice(0, currentIndex), draggedNode.data, ...oldChildren!.slice(currentIndex)]);
            // console.log('--------------------------')
            this.store.update(parent.data.id,
                (entity: INodeState) => ({
                    ...entity,
                    children: [
                        ...entity.children!.slice(0, currentIndex),
                        draggedNode.data,
                        ...entity.children!.slice(currentIndex)
                    ]
                })
            );
        });
    }
}