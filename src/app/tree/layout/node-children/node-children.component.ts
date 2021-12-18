import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INode } from '../node-content/node-content.component';

@Component({
  selector: 'tree-node-children',
  templateUrl: './node-children.component.html',
  styleUrls: ['./node-children.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeChildrenComponent implements OnInit {

  @Input() node!: INode;
  constructor() { }

  ngOnInit(): void {
  }

}
