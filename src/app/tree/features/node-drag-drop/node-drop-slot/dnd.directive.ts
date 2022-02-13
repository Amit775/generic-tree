import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, OnInit } from "@angular/core";

@Directive({ selector: '[dnd]' })
export class DNDDirective implements OnInit, OnDestroy {
    constructor(private element: ElementRef) { }

    private get htmlElement(): HTMLElement {
        return this.element.nativeElement;
    }

    @HostListener('drag', ['$event'])
    onDrag(event: DragEvent): void {
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        console.log(event);
    }

    ngOnInit(): void {
        this.htmlElement.draggable = true;
    }

    ngOnDestroy(): void {
        
    }
}