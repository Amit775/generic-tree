import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TemplatesService, TreeNodeTemplates } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-collection',
  templateUrl: './node-collection.component.html',
  styleUrls: ['./node-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit, AfterViewInit {
  template: TreeNodeTemplates['full'] | null = null;
  ids$!: Observable<string[]>;

  @Input('templates') set templatesInput(value: TreeNodeTemplates | undefined) {
    if (!value) return;
    this.templates.setTemplates(value);
  }

  @Input() parent!: INodeState;
  ngAfterViewInit(): void { }
  constructor(private templates: TemplatesService, private treeQuery: TreeQuery) { }

  ngOnInit(): void {
    this.template = this.templates.getTemplate('full');
    this.ids$ = this.treeQuery.selectAll().pipe(map(nodes => nodes.map(node => node.id)));
    console.log(this.parent)
  }

  trackNode(index: number, node: INodeState): string {
    return node.id;
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event.container.data);
    console.log(event);
  }

  public nodesHeight$(root: INodeState): Observable<string> {
    return this.treeQuery.selectEntity(root.id).pipe(
      map((node: INodeState | undefined) => this.countVisibleChildren(node)),
      tap(x => console.log(x, root)),
      map((decendentVisibleCount: number) => `${(decendentVisibleCount + 1) * 40}px`)
    );
  }

  private countVisibleChildren(node: INodeState | undefined): number {
    if (node == null || node.flags.expanded === false || node.children == null) return 0;
    return node.children.reduce((sum: number, child: INodeState) => sum += this.countVisibleChildren(child) ?? 0, 0);
  }

  public totalHeight$(): Observable<string> {
    return this.treeQuery.selectAll({ filterBy: node => node.path.length === 0 }).pipe(
      map(roots => roots.reduce((sum: number, child: INodeState) => sum += this.countVisibleChildren(child) ?? 0, 0)),
      tap(x => console.log(x)),
      map((decendentVisibleCount: number) => `${(decendentVisibleCount + 1) * 40}px`)
    )
  }
}
