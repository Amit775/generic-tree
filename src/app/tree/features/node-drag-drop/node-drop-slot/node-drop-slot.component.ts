import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/tree/core/node/node.service';
import { INodeState } from 'src/app/tree/models/node.state';

@Component({
  selector: 'tree-node-drop-slot',
  templateUrl: './node-drop-slot.component.html',
  styleUrls: ['./node-drop-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeDropSlotComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private service: NodeService) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any>): void {

    console.log(event);
  }
}
