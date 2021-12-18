import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeService } from '../../core/tree/tree.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { INodeState } from '../../models/node.state';

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
  }

  removeChildren(nodes: INodeState[]): INodeState[] {
    nodes.forEach(node => delete node.data.children);
    return nodes;
  }


}
