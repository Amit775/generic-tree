import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export interface INode {
  display: string;
  chiildren: Node[];
}

@Component({
  selector: 'tree-node-content',
  templateUrl: './node-content.component.html',
  styleUrls: ['./node-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeContentComponent implements OnInit {

  @Input() node!: INode;
  constructor() { }

  ngOnInit(): void {
  }

}
