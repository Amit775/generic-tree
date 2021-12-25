import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeService } from '../../core/node/node.service';
import { INodeState } from '../../models/node.state';

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
    this.nodeService.toggleFlag('expanded');
  }

  ngOnInit(): void {
  }

}
