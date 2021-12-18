import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INode } from '../node-content/node-content.component';

@Component({
  selector: 'tree-node-indicator',
  templateUrl: './node-indicator.component.html',
  styleUrls: ['./node-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeIndicatorComponent implements OnInit {

  @Input() node!: INode;
  constructor() { }

  ngOnInit(): void {
  }

}
