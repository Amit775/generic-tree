import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from 'src/app/tree/core/tree.store';
import { NodeService } from './node.service';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService]
})
export class NodeComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private service: NodeService) { }

  ngOnInit(): void {
    console.log('from node - init', this.node);
    this.service.setNode(this.node.id);
  }

}
