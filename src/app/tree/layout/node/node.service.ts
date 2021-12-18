import { forwardRef, Injectable, OnInit } from "@angular/core";
import { NodeComponent } from "./node.component";

@Injectable({ providedIn: forwardRef(() => NodeComponent) })
export class NodeService implements OnInit {

    id: string = 'bublil';
    ngOnInit(): void {
        console.log('init')
    }

    setNode(id: string): void {
        console.log(this.id)
        console.log(id);
        this.id = id;
        console.log(this.id);
    }
}