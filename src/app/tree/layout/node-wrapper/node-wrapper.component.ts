import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INode } from '../node-content/node-content.component';

@Component({
  selector: 'tree-node-wrapper',
  templateUrl: './node-wrapper.component.html',
  styleUrls: ['./node-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {

  @Input() node!: INode;
  constructor() { }

  ngOnInit(): void {
  }

}
