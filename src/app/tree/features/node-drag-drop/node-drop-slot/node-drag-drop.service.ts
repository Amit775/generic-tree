import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { INodeState } from "src/app/tree/models/node.state";

@Injectable({ providedIn: 'root' })
export class NodeDragDropService {
    private _dragAndDrops = new BehaviorSubject<string[]>([]);
    public dragAndDrops$ = this._dragAndDrops.asObservable();

    public register(id: string): void {
        this._dragAndDrops.next([...this._dragAndDrops.value, id]);
    }
    public unregister(id: string): void {
        this._dragAndDrops.next(this._dragAndDrops.value.filter(x => x !== id));
    }

    onDragDrop(event: CdkDragDrop<INodeState[]>): void {
        if (event.container == event.previousContainer) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            return;
        }

        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
}