import { CdkDropList } from "@angular/cdk/drag-drop";
import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NodeDragDropService } from "./node-drag-drop.service";

@Directive({
    selector: '[dragAndDropManager]'
})
export class dragAndDropManagerDirective implements OnInit, OnDestroy {
    private subscription!: Subscription;

    constructor(
        private dropList: CdkDropList,
        private managerService: NodeDragDropService
    ) { }

    ngOnInit(): void {
        this.dropList.lockAxis = 'y';
        this.managerService.register(this.dropList.id);
        this.subscription = this.managerService.dragAndDrops$.subscribe(list => {
            this.dropList.connectedTo = list.reverse();
            console.log(this.dropList);
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

@Directive({
    selector: '[dragAndDropManagerRoot]',
    providers: [{ provide: NodeDragDropService}]
})
export class dragAndDropManagerRootDirective extends dragAndDropManagerDirective { }