import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-indicator',
  templateUrl: './node-indicator.component.html',
  styleUrls: ['./node-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeIndicatorComponent implements OnInit {

  @Input() node!: INodeState;
  constructor() { }

  ngOnInit(): void {
  }

}
