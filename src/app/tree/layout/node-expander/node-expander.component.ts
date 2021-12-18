import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../core/tree.store';

@Component({
  selector: 'tree-node-expander',
  templateUrl: './node-expander.component.html',
  styleUrls: ['./node-expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnInit {

  @Input() node!: INodeState;
  constructor() { }

  ngOnInit(): void {
  }

}
