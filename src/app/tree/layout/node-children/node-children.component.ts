import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-children',
  templateUrl: './node-children.component.html',
  styleUrls: ['./node-children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

  @Input() node!: INodeState;
  constructor(private query: TreeQuery, private service: NodeService, private dragService: NodeDragDropService) { }

  children$!: Observable<INodeState[]>;
  node$!: Observable<INodeState>;
  isExpanded$!: Observable<boolean | undefined>;

  ngOnInit(): void {
    this.children$ = this.query.selectChildrenNodes(this.node?.id);
    this.node$ = this.service.selectNode();
    this.isExpanded$ = this.service.selectFlag('expanded');
  }
}
