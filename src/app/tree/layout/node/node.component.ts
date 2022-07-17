import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { TreeService } from '../../core/tree/tree.service';
import { SubTree } from '../../core/tree/tree.store';

@UntilDestroy()
@Component({
	selector: 'tree-node',
	templateUrl: './node.component.html',
	styleUrls: ['./node.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit, OnChanges {
	template!: TreeNodeTemplate | null;
	context!: TreeNodeContext;
	public subTree: SubTree | undefined;
	private subscription: Subscription | undefined;

	private _nodeId!: string;
	@Input() set nodeId(value: string) {
		this._nodeId = value;
	}
	get nodeId(): string {
		return this._nodeId;
	}

	constructor(
		private query: TreeQuery,
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	ngOnChanges(change: SimpleChanges): void { 
		this.service.init(this.nodeId);
		this.context = { node$: this.service.selectNode() };
		this.subTree = this.query.getEntity(this.nodeId);
	}

	ngOnInit(): void {
		this.template = this.templates.getTemplate('full');
	}
}
