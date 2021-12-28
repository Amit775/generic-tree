import { Directive, EmbeddedViewRef, Input, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[animateExpand]'
})
export class AnimateExpandDirective<T> {
    private _isExpanded: boolean = true;
    private animateSpeed = 20;
    private animateAcceleration = 20;

    @Input('animateExpand')
    set isExpanded(value: boolean) {
        if (value) {
            this._show();
            if (this._isExpanded === false) {
                this._animateOpen();
            }
        } else {
            this._animateClose();
        }
        this._isExpanded = value;
    }
    get isExpanded(): boolean {
        return this._isExpanded;
    }

    private _embeddedView: EmbeddedViewRef<T> | null = null;

    constructor(
        private templateRef: TemplateRef<T>,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) { }

    private _show(): void {
        if (this._embeddedView != null) return;

        this._embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    private _hide(): void {
        if (this._embeddedView == null) return;
        this.viewContainerRef.clear();
        this._embeddedView = null;
    }

    private _animateOpen() {
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        const innerElement = this._embeddedView?.rootNodes[0];
        let maxHeight = 0;
    
        // set height to 0
        this.renderer.setStyle(innerElement, 'max-height', `0`);
    
        // increase maxHeight until height doesn't change
        setTimeout(() => { // Allow inner element to create its content
          const i: any = setInterval(() => {
            if (!this._isExpanded || !innerElement) return clearInterval(i);
    
            maxHeight += delta;
            const roundedMaxHeight = Math.round(maxHeight);
    
            this.renderer.setStyle(innerElement, 'max-height', `${roundedMaxHeight}px`);
            const height = innerElement.getBoundingClientRect ? innerElement.getBoundingClientRect().height : 0; // TBD use renderer
    
            delta *= ease;
            ease *= 1.005;
            if (height < roundedMaxHeight) {
              // Make maxHeight auto because animation finished and container might change height later on
              this.renderer.setStyle(innerElement, 'max-height', null);
              clearInterval(i);
            }
          }, 17);
        });
      }
    
      private _animateClose() {
        if (!this._embeddedView) return;

        const innerElement = this._embeddedView.rootNodes[0];
    
        let delta = this.animateSpeed;
        let ease = this.animateAcceleration;
        let height = innerElement.getBoundingClientRect().height; // TBD use renderer
    
        // slowly decrease maxHeight to 0, starting from current height
        const i: any = setInterval(() => {
          if (this._isExpanded || !innerElement) return clearInterval(i);
    
          height -= delta;
          this.renderer.setStyle(innerElement, 'max-height', `${height}px`);
          delta *= ease;
          ease *= 1.005;
    
          if (height <= 0) {
            // after animation complete - remove child element
            this.viewContainerRef.clear();
            this._embeddedView = null;
            clearInterval(i);
          }
        }, 17);
      }
}