import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TreeNodeContext, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { TreeService } from '../../core/tree/tree.service';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

export interface INodeData {
  display: string;
  children?: INodeData[]
}

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

  @Input() set dataSource(nodesData: INodeData[]) {
    this.service.virtualRoot = this.virtualRoot([]);
    const nodes = this.convertNodes(nodesData ?? []);
    this.service.virtualRoot.children = nodes;
    this.service.setNodes(nodes);
  }

  constructor(
    private service: TreeService,
    private query: TreeQuery,
    private dragService: NodeDragDropService
  ) { }

  roots$!: Observable<INodeState[]>;
  virtualRoot$!: Observable<INodeState>;

  ngOnInit(): void {
    this.roots$ = this.query.selectAll({ filterBy: node => node.path.length === 1 });
  }

  private virtualRoot(roots: INodeState[]): INodeState {
    return {
      data: { virtual: true },
      path: [],
      id: 'root',
      flags: {},
      children: roots
    }
  }

  private convertNodes(datas: any[]): INodeState[] {
    const nodes: INodeState[] = []

    datas.map((data: INodeData) => this.convert(nodes, data, this.service.virtualRoot));

    return nodes;
  }

  private convert(nodes: INodeState[], data: INodeData, parent: INodeState): INodeState {
    const node: INodeState = {
      data,
      path: [...parent.path, parent],
      flags: {},
      id: uuid()
    }

    nodes.push(node);

    if (data.children) {
      const childrenNodes: INodeState[] = data.children.map((childData: INodeData) => this.convert(nodes, childData, node));
      nodes = [...nodes, ...childrenNodes];
      node.children = childrenNodes;
    }

    return node;
  }

}

let lastid: string;
function uuid(): string {
  if (!lastid) {
    lastid = '0';
  } else {
    lastid = `${(+lastid) + 1}`;
  }

  return lastid;
}
