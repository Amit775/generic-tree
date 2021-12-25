import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
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

  isExpanded$!: Observable<boolean | undefined>;

  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.isExpanded$  = this.service.selectFlag('expanded');
  }

  toggle(): void {
    this.toggled.emit();
  }


}
