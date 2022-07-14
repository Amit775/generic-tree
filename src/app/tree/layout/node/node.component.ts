import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';

@Component({
	selector: 'tree-node',
	templateUrl: './node.component.html',
	styleUrls: ['./node.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit {
	template!: TreeNodeTemplate | null;
	context!: TreeNodeContext;

	@Input() public nodeId!: string;

	public node: SubTree | undefined;

	constructor(
		private query: TreeQuery, 
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	ngOnInit(): void {
		this.service.init(this.nodeId);
		this.template = this.templates.getTemplate('full');
		this.context = { node$: this.service.selectNode() }
		this.node = this.query.getEntity(this.nodeId);
	}
}
