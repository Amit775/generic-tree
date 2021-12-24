import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { INodeState } from '../../models/node.state';
import { NodeService } from '../node/node.service';

@Component({
  selector: 'tree-node-expander',
  templateUrl: './node-expander.component.html',
  styleUrls: ['./node-expander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnInit {

  @Input() node!: INodeState;
  @Output() toggled = new EventEmitter<void>();

  isExpanded$!: Observable<boolean>;

  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.isExpanded$  = this.service.selectFlag('expanded');
  }

  toggle(): void {
    this.toggled.emit();
  }


}
