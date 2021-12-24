import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../models/node.state';
import { TreeNodeTemplates } from '../node/node.service';

@Component({
  selector: 'tree-node-collection',
  templateUrl: './node-collection.component.html',
  styleUrls: ['./node-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit, AfterViewInit {

  @Input() templates!: TreeNodeTemplates;
  @Input() nodes: INodeState[] | null = [];
  ngAfterViewInit(): void {

  }
  constructor() { }

  ngOnInit(): void {
  }

}
