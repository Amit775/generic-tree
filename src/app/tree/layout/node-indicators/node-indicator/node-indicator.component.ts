import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeQuery } from 'src/app/tree/core/tree/tree.query';
import { Flags } from 'src/app/tree/models/flags.model';
import { ITreeState } from 'src/app/tree/models/tree.state';
import { INodeState } from '../../../models/node.state';

export interface IIndicator {
  flag: keyof Flags;
  onIcon?: string;
  offIcon?: string;
  onAction?: (node: INodeState, state: ITreeState) => void;
  offAction?: (node: INodeState, state: ITreeState) => void;
}

@Component({
  selector: 'tree-node-indicator',
  templateUrl: './node-indicator.component.html',
  styleUrls: ['./node-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeIndicatorComponent implements OnInit {

  @Input() node!: INodeState;
  @Input() indicator!: IIndicator;
  
  @Output() toggled = new EventEmitter();
  
  constructor(private query: TreeQuery) { }
  flag$!: Observable<boolean>;
  
  ngOnInit(): void {
    this.flag$ = this.query.selectEntity(this.node.id, node => node?.flags[this.indicator.flag] == true);
  }

  toggle(): void {
    this.toggled.emit();
  }
}
