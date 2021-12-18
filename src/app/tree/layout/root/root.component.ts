import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { INode } from '../node-content/node-content.component';

@Component({
  selector: 'tree-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

  @Input() nodes: INode[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
