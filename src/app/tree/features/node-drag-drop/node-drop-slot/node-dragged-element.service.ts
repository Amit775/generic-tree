import { INodeState } from "src/app/tree/models/node.state";

export class NodeDraggedElement {
    private _draggedElement: INodeState | null = null;

    get(): INodeState | null {
        return this._draggedElement;
    }

    set(element: INodeState | null): void {
        this._draggedElement = element;
    }

    isDragging(): boolean {
        return this._draggedElement != null;
    }
}