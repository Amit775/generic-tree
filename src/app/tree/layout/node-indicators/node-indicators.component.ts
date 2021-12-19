import { Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../models/node.state';
import { IIndicator } from './node-indicator/node-indicator.component';

@Component({
  selector: 'tree-node-indicators',
  templateUrl: './node-indicators.component.html',
  styleUrls: ['./node-indicators.component.scss']
})
export class NodeIndicatorsComponent implements OnInit {

  @Input() node!: INodeState;
  constructor() { }

  ngOnInit(): void {
  }

  toggleIndicator(indicator: IIndicator): void {
    const oldValue = this.node.flags[indicator.flag];
    
  }

}
