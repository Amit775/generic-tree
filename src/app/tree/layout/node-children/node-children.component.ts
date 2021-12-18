import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INodeState, TreeQuery } from '../../core/tree.store';
import { NodeService } from '../node/node.service';

@Component({
  selector: 'tree-node-children',
  templateUrl: './node-children.component.html',
  styleUrls: ['./node-children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private query: TreeQuery, private nodeService: NodeService) { }

  children$!: Observable<INodeState[]>;

  ngOnInit(): void {
    console.log(this.nodeService.id);
    console.log(this.node);
    this.children$ = this.query.selectChildrenNodes(this.node?.id);
  }

}
