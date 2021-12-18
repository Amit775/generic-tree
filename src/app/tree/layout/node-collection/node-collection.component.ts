import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INode } from '../node-content/node-content.component';

@Component({
  selector: 'tree-node-collection',
  templateUrl: './node-collection.component.html',
  styleUrls: ['./node-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit {

  @Input() nodes!: INode[];
  constructor() { }

  ngOnInit(): void {
  }

}
