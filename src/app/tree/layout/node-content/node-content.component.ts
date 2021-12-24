import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';
import { Observable, startWith, tap } from 'rxjs';
import { INodeState } from '../../models/node.state';
import { NodeService, TreeNodeContext } from '../node/node.service';


@Component({
  selector: 'tree-node-content',
  templateUrl: './node-content.component.html',
  styleUrls: ['./node-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnInit, AfterViewInit {
  @Input() node!: INodeState;
  constructor(private service: NodeService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  public get template$(): Observable<TemplateRef<TreeNodeContext> | null> {
    return this.service.selectTemplate$('content');
  }
}
