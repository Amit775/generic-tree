import { Component, OnInit } from '@angular/core';
import { INodeState } from './tree/models/node.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'generic-tree';

  nodes: INodeState[] = [];
  ngOnInit(): void {
    this.nodes = this.convertNodes(this.nodesData);
  }

  nodesData: any[] = [
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

  convertNodes(datas: any[]): INodeState[] {
    const nodes: INodeState[] = []

    datas.map((data, index) => this.convert(nodes, data, index, undefined));

    return nodes;
  }

  convert(nodes: INodeState[], data: any, index: number, parent?: INodeState | undefined): INodeState {
    const node: INodeState = {
      data,
      indexInParent: index,
      path: parent ? [...parent.path, parent.id] : [],
      flags: {},
      id: uuid()
    }

    nodes.push(node);

    if (data.children) {
      const childrenNodes: INodeState[] = data.children.map((childData: any, childIndex: number) => this.convert(nodes, childData, childIndex, node));
      nodes = [...nodes, ...childrenNodes];
      node.children = childrenNodes.map(child => child.id);
    }

    return node;
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
