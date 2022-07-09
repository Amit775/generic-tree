import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TreeNodeContext, TreeNodeTemplates } from '../../core/templates.service';
import { NodesQuery } from '../../core/nodes/nodes.query';
import { NodesService } from '../../core/nodes/nodes.service';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';
import { SubTree } from '../../core/tree/tree.store';
import { TreeQuery } from '../../core/tree/tree.query';
import { filterNilValue } from '@datorama/akita';

@Component({
  selector: 'tree-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit, AfterViewInit {

  @ContentChild('treeNodeContent', { read: TemplateRef }) treeNodeContentTemplate: TemplateRef<TreeNodeContext> | undefined;
  @ContentChild('treeNodeWrapper', { read: TemplateRef }) treeNodeWrapperTemplate: TemplateRef<TreeNodeContext> | undefined;
  @ContentChild('treeNodeLoading', { read: TemplateRef }) treeNodeLoadingTemplate: TemplateRef<TreeNodeContext> | undefined;
  @ContentChild('treeNodeFull', { read: TemplateRef }) treeNodeFullTemplate: TemplateRef<TreeNodeContext> | undefined;

  public get templates(): TreeNodeTemplates {
    return {
      content: this.treeNodeContentTemplate ?? null,
      wrapper: this.treeNodeWrapperTemplate ?? null,
      loading: this.treeNodeLoadingTemplate ?? null,
      full: this.treeNodeFullTemplate ?? null
    };
  }

  ngAfterViewInit(): void { }

  @Input() nodes: INodeState[] = [];

  constructor(private service: NodesService, private query: TreeQuery, private dragService: NodeDragDropService) { }

  public virtualRoot$!: Observable<SubTree>;

  ngOnInit(): void {
	this.virtualRoot$ = this.query.selectEntity('root').pipe(filterNilValue());
  }

  removeChildren(nodes: INodeState[]): INodeState[] {
    nodes.forEach(node => delete node.data.children);
    return nodes;
  }

  onDrop(event: CdkDragDrop<SubTree>): void {
	console.log(event);
    // this.dragService.onDragDrop(event);
  }
}
