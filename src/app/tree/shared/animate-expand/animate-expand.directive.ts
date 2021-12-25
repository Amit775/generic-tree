import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[animateExpand]'
})
export class AnimateExpandDirective<T> {
    private _isExpanded: boolean = true;

    @Input('animateExpand')
    set isExpanded(value: boolean) {
        value ? this._show() : this._hide();
        this._isExpanded = value;
    }
    get isExpanded(): boolean {
        return this._isExpanded;
    }

    private _innerElement: HTMLElement | undefined;

    constructor(
        private templateRef: TemplateRef<T>,
        private viewContainerRef: ViewContainerRef
    ) { }

    private _show(): void {
        if (this._innerElement) return;

        this._innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];
    }

    private _hide(): void {
        this.viewContainerRef.clear();
        this._innerElement = undefined;
    }
}