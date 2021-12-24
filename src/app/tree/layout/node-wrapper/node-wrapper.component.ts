import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../models/node.state';
import { NodeService } from '../node/node.service';

@Component({
  selector: 'tree-node-wrapper',
  templateUrl: './node-wrapper.component.html',
  styleUrls: ['./node-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private nodeService: NodeService) { }

  toggleExpand(): void {
    this.nodeService.toggleExpand();
  }

  ngOnInit(): void {
  }

}
