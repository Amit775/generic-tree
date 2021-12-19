import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-expander',
  templateUrl: './node-expander.component.html',
  styleUrls: ['./node-expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnInit {

  @Input() node!: INodeState;
  @Output() toggled = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }

  toggle(): void {
    this.toggled.emit();
  }

}
