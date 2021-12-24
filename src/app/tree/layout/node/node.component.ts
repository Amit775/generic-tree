import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../models/node.state';
import { NodeService } from './node.service';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService]
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Input() node!: INodeState;

  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.service.init(this.node.id);
  }

  ngAfterViewInit(): void { }

}
