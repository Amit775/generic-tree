import { AfterViewInit, Directive, ElementRef, HostListener, Input, NgZone, OnDestroy } from '@angular/core';
import { INodeState } from 'src/app/tree/models/node.state';
import { NodeDraggedElement } from './node-dragged-element.service';

const DRAG_OVER_CLASS = 'is-dragging-over';

@Directive({
  selector: '[nodeDrag]'
})
export class NodeDragDirective implements AfterViewInit, OnDestroy {
  @Input('nodeDrag') draggedElement!: INodeState;
  private readonly dragEventHandler: (ev: DragEvent) => void;

  constructor(private el: ElementRef, private nodeDraggedElement: NodeDraggedElement, private ngZone: NgZone) {
    this.dragEventHandler = this.onDrag.bind(this);
  }

  ngAfterViewInit() {
    let el: HTMLElement = this.el.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      el.addEventListener('drag', this.dragEventHandler);
    });
  }

  ngOnDestroy() {
    let el: HTMLElement = this.el.nativeElement;
    el.removeEventListener('drag', this.dragEventHandler);
  }

  @HostListener('dragstart', ['$event']) 
  onDragStart(event: DragEvent) {
    this.nodeDraggedElement.set(this.draggedElement);
  }

  onDrag(event: DragEvent) {
  }

  @HostListener('dragend') onDragEnd() {
    this.nodeDraggedElement.set(null);
  }
}
