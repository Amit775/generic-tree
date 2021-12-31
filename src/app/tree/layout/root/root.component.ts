import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TreeNodeContext, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { TreeService } from '../../core/tree/tree.service';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

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

  constructor(private service: TreeService, private query: TreeQuery, private dragService: NodeDragDropService) { }
  roots$!: Observable<INodeState[]>;
  virtualRoot$!: Observable<INodeState>;

  ngOnInit(): void {
    this.service.setNodes(this.removeChildren(this.nodes));
    this.query.selectAll().subscribe(console.log);
    this.roots$ = this.query.selectAll({ filterBy: node => node.path.length === 1 });
    this.virtualRoot$ = this.roots$.pipe(
      map(roots => ({
        data: { virtual: true },
        path: [],
        id: 'root',
        flags: {},
        children: roots
      }) as INodeState)
    );
    this.virtualRoot$.subscribe(console.log);
  }

  removeChildren(nodes: INodeState[]): INodeState[] {
    nodes.forEach(node => delete node.data.children);
    return nodes;
  }

  onDrop(event: CdkDragDrop<INodeState>): void {
    this.dragService.onDragDrop(event);
  }
}
