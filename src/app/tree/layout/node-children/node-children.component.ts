import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-children',
  templateUrl: './node-children.component.html',
  styleUrls: ['./node-children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private query: TreeQuery, private service: NodeService) { }

  children$!: Observable<INodeState[]>;
  isExpanded$!: Observable<boolean | undefined>;

  ngOnInit(): void {
    this.children$ = this.query.selectChildrenNodes(this.node?.id);
    this.isExpanded$ = this.service.selectFlag('expanded');
  }

}
