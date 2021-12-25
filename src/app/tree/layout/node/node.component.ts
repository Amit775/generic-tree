import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Input() node!: INodeState;

  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.service.init(this.node.id);
  }

  ngAfterViewInit(): void { }

}
