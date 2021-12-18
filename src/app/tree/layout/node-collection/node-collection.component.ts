import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../core/tree.store';

@Component({
  selector: 'tree-node-collection',
  templateUrl: './node-collection.component.html',
  styleUrls: ['./node-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit {

  @Input() nodes: INodeState[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
