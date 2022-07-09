import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { applyTransaction } from "@datorama/akita";
import { BehaviorSubject } from "rxjs";
import { TreeService } from "src/app/tree/core/tree/tree.service";
import { SubTree, TreeStore } from "src/app/tree/core/tree/tree.store";

@Injectable({ providedIn: 'root' })
export class NodeDragDropService {
	private _dragAndDrops = new BehaviorSubject<string[]>([]);
	public dragAndDrops$ = this._dragAndDrops.asObservable();

	constructor(private service: TreeService) { }

	public register(id: string): void {
		this._dragAndDrops.next([...this._dragAndDrops.value, id]);
		console.log('registered: ', this._dragAndDrops.value);
	}
	public unregister(id: string): void {
		this._dragAndDrops.next(this._dragAndDrops.value.filter(x => x !== id));
	}

	onDragDrop(event: CdkDragDrop<SubTree, SubTree, SubTree>): void {
		const {
			container: currentParent,
			previousContainer: prevParent,
			currentIndex,
			previousIndex,
			item: draggedNode
		} = event;
		
		this.service.moveNode(draggedNode.data,
			{ parent: prevParent.data, index: previousIndex },
			{ parent: currentParent.data, index: currentIndex }
		)
	}
}