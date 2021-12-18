import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INodeState } from '../../core/tree.store';

@Component({
  selector: 'tree-node-wrapper',
  templateUrl: './node-wrapper.component.html',
  styleUrls: ['./node-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {

  @Input() node!: INodeState;
  constructor() { }

  ngOnInit(): void {
  }

}
