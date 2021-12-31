import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INodeState } from './tree/models/node.state';

interface NodeData {
  display: string;
  children?: NodeData[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'generic-tree';

  nodes: INodeState[] = [];
  roots: INodeState[] = [];
  ngOnInit(): void {
    this.nodes = this.convertNodes(this.nodesData);
    this.roots = this.nodes.filter(node => node.path.length == 1);
  }

  nodesData: NodeData[] = [
    { display: 'a' },
    {
      display: 'b',
      children: [
        { display: 'ba' },
        {
          display: 'bb',
          children: [
            { display: 'bba' },
            { display: 'bbb' },
            { display: 'bbc' },
          ],
        },
        { display: 'bc' },
      ],
    },
  ];

  // nodesData: NodeData[] = [
  //   { display: 'a', children: [{ display: 'child' }] },
  //   { display: 'b' },
  //   { display: 'ba' },
  //   { display: 'bb' },
  //   { display: 'bba' },
  //   { display: 'bbb' },
  //   { display: 'bbc' },
  //   { display: 'bc' },
  // ];

  convertNodes(datas: any[]): INodeState[] {
    const nodes: INodeState[] = []

    datas.map((data, index) => this.convert(nodes, data, index, undefined));
    console.log(nodes);

    return nodes;
  }

  convert(nodes: INodeState[], data: any, index: number, parent?: INodeState | undefined): INodeState {
    const node: INodeState = {
      data,
      path: parent ? [...parent.path, parent.id] : ['root'],
      flags: {},
      id: uuid()
    }

    nodes.push(node);

    if (data.children) {
      const childrenNodes: INodeState[] = data.children.map((childData: any, childIndex: number) => this.convert(nodes, childData, childIndex, node));
      nodes = [...nodes, ...childrenNodes];
      node.children = childrenNodes;
    }

    return node;
  }

  drop(event: CdkDragDrop<string>): void {
    console.log(event);
  }
}

let lastid: string;
function uuid(): string {
  if (!lastid) {
    lastid = '0';
  } else {
    lastid = `${(+lastid) + 1}`;
  }

  return lastid;
}
