import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from "@angular/core";

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

    private _innerElement: EmbeddedViewRef<T> | null = null;

    constructor(
        private templateRef: TemplateRef<T>,
        private viewContainerRef: ViewContainerRef
    ) { }

    private _show(): void {
        if (this._innerElement != null) return;

        this._innerElement = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    private _hide(): void {
        if (this._innerElement == null) return;
        console.log('clear');
        this.viewContainerRef.clear();
        this._innerElement = null;
    }
}