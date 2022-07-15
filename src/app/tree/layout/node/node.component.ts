import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
	isExpanded$!: Observable<boolean | undefined>;
	public subTree: SubTree | undefined;

	@Input() public nodeId!: string;

	get hasChildren(): boolean {
		return this.subTree?.children != null && this.subTree.children.length > 0;
	}

	constructor(
		private query: TreeQuery,
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	ngOnInit(): void {
		this.service.init(this.nodeId);
		this.template = this.templates.getTemplate('full');
		this.context = { node$: this.service.selectNode() };
		this.isExpanded$ = this.service.selectFlag('expanded');
		this.subTree = this.query.getEntity(this.nodeId);
	}
}
