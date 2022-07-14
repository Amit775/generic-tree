import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';

@Component({
	selector: 'tree-node-expander',
	templateUrl: './node-expander.component.html',
	styleUrls: ['./node-expander.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeExpanderComponent implements OnInit {

	@Input() nodeId!: string;
	@Output() toggled = new EventEmitter<void>();

	public subTree!: SubTree;

	public isExpanded$!: Observable<boolean | undefined>;
	public hasChildren$!: Observable<boolean | undefined>

	constructor(
		private service: NodeService,
		private query: TreeQuery,
	) { }

	ngOnInit(): void {
		this.isExpanded$ = this.service.selectFlag('expanded');
		this.subTree = this.query.getEntity(this.nodeId)!;
	}

	toggle(): void {
		this.toggled.emit();
	}
}
