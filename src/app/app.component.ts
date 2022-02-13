import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INodeData } from './tree/layout/root/root.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'generic-tree';

  ngOnInit(): void { }

  nodesData: INodeData[] = [
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

  // nodesData: INodeData[] = [
  //   { display: 'a', children: [{ display: 'child' }] },
  //   { display: 'b' },
  //   { display: 'ba' },
  //   { display: 'bb' },
  //   { display: 'bba' },
  //   { display: 'bbb' },
  //   { display: 'bbc' },
  //   { display: 'bc' },
  // ];
}
