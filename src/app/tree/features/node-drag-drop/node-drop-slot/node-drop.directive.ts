import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    OnDestroy,
    Output
} from '@angular/core';
import { TreeService } from 'src/app/tree/core/tree/tree.service';
import { TreeStore } from 'src/app/tree/core/tree/tree.store';
import { INodeState } from 'src/app/tree/models/node.state';
import { NodeDraggedElement } from './node-dragged-element.service';

const DRAG_OVER_CLASS = 'is-dragging-over';
const DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';

@Directive({
    selector: '[nodeDrop]'
})
export class NodeDropDirective implements AfterViewInit, OnDestroy {
    @Input() allowDragoverStyling = true;
    @Output('treeDrop') onDropCallback = new EventEmitter();
    @Output('treeDropDragOver') onDragOverCallback = new EventEmitter();
    @Output('treeDropDragLeave') onDragLeaveCallback = new EventEmitter();
    @Output('treeDropDragEnter') onDragEnterCallback = new EventEmitter();
    private readonly dragOverEventHandler: (event: DragEvent) => void;
    private readonly dragEnterEventHandler: (event: DragEvent) => void;
    private readonly dragLeaveEventHandler: (event: DragEvent) => void;

    private _allowDrop = (element: INodeState, event: DragEvent) => true;

    @Input() set treeAllowDrop(allowDrop: boolean | ((element: INodeState, event: DragEvent) => boolean)) {
        this._allowDrop = typeof allowDrop === 'function' ? allowDrop : (element, event) => allowDrop;
    }

    allowDrop(event: DragEvent): boolean {
        if (this.nodeDraggedElement.get() == null) return false;
        return this._allowDrop(this.nodeDraggedElement.get()!, event)
    }

    constructor(
        private elementRef: ElementRef,
        private nodeDraggedElement: NodeDraggedElement,
        private ngZone: NgZone,
        private treeService: TreeService
    ) {
        this.dragOverEventHandler = this.onDragOver.bind(this);
        this.dragEnterEventHandler = this.onDragEnter.bind(this);
        this.dragLeaveEventHandler = this.onDragLeave.bind(this);
    }

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener('dragover', this.dragOverEventHandler);
            this.element.addEventListener('dragenter', this.dragEnterEventHandler);
            this.element.addEventListener('dragleave', this.dragLeaveEventHandler);
        });
    }

    ngOnDestroy() {
        this.element.removeEventListener('dragover', this.dragOverEventHandler);
        this.element.removeEventListener('dragenter', this.dragEnterEventHandler);
        this.element.removeEventListener('dragleave', this.dragLeaveEventHandler);
    }

    onDragOver(event: DragEvent) {
        if (!this.allowDrop(event)) {
            if (this.allowDragoverStyling) {
                return this.addDisabledClass();
            }
            return;
        }

        this.onDragOverCallback.emit({ event: event, element: this.nodeDraggedElement.get() });

        event.preventDefault();
        if (this.allowDragoverStyling) {
            this.addClass();
        }
    }

    onDragEnter(event: DragEvent): void {
        if (!this.allowDrop(event)) return;

        event.preventDefault();
        this.onDragEnterCallback.emit({ event: event, element: this.nodeDraggedElement.get() });
    }

    onDragLeave(event: DragEvent): void {
        if (!this.allowDrop(event)) {
            if (this.allowDragoverStyling) {
                return this.removeDisabledClass();
            }
            return;
        }
        this.onDragLeaveCallback.emit({ event: event, element: this.nodeDraggedElement.get() });

        if (this.allowDragoverStyling) {
            this.removeClass();
        }
    }

    @HostListener('drop', ['$event']) 
    onDrop(event: DragEvent): void {
        if (!this.allowDrop(event)) return;

        event.preventDefault();
        this.onDropCallback.emit({ event: event, element: this.nodeDraggedElement.get() });

        if (this.allowDragoverStyling) {
            this.removeClass();
        }
        this.nodeDraggedElement.set(null);
    }

    private addClass() {
        this.element.classList.add(DRAG_OVER_CLASS);
    }

    private removeClass() {
        this.element.classList.remove(DRAG_OVER_CLASS);
    }

    private addDisabledClass() {
        this.element.classList.add(DRAG_DISABLED_CLASS);
    }

    private removeDisabledClass() {
        this.element.classList.remove(DRAG_DISABLED_CLASS);
    }
}
