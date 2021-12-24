import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { TreeQuery } from '../../core/tree/tree.query';
import { INodeState } from '../../models/node.state';
import { NodeService, TreeNodeTemplates } from '../node/node.service';

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
  isExpanded$!: Observable<boolean | undefined>;

  public get templates(): Observable<TreeNodeTemplates> {
    return this.nodeService.templates$;
  }

  ngOnInit(): void {
    this.children$ = this.query.selectChildrenNodes(this.node?.id);
    this.isExpanded$ = this.query.selectEntity(this.node.id).pipe(
      map(node => node?.flags['expanded']),
      distinctUntilChanged()
    );
  }

}
