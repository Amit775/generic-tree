import { BoundElementProperty } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeService } from '../../core/tree.service';
import { INodeState, TreeQuery } from '../../core/tree.store';

@Component({
  selector: 'tree-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

  @Input() nodes: INodeState[] = [];


  constructor(private service: TreeService, private query: TreeQuery) { }
  roots$: Observable<INodeState[]> = this.query.selectAll({ filterBy: node => node.path.length === 0 });

  ngOnInit(): void {
    this.service.setNodes(this.removeChildren(this.nodes));
    console.log(this.nodes);
  }

  removeChildren(nodes: INodeState[]): INodeState[] {
    nodes.forEach(node => delete node.data.children);
    return nodes;
  }


}
