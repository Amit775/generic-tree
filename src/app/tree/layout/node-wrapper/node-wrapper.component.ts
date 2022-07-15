import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';

@Component({
	selector: 'tree-node-wrapper',
	templateUrl: './node-wrapper.component.html',
	styleUrls: ['./node-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {
	@Input() nodeId!: string;

	public template!: TreeNodeTemplate | null;
	public context!: TreeNodeContext;
	public isActive$!: Observable<boolean | undefined>;
	public path!: string[];
	public subTree!: SubTree;

	constructor(
		private treeQuery: TreeQuery,
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	ngOnInit(): void {
		this.template = this.templates.getTemplate('wrapper');
		this.context = { node$: this.service.selectNode() };
		this.isActive$ = this.service.selectFlag('active');
		this.path = this.treeQuery.getNodePath(this.nodeId);
		this.subTree = this.treeQuery.getEntity(this.nodeId)!;
	}

	toggleActive(event: MouseEvent): void {
		this.service.WithinSingleUpdate(() => {
			const multiple = event.ctrlKey;
			this.service.toggleFlag('active', !multiple);
			if (!multiple && this.subTree.children != null) {
				this.service.toggleFlag('expanded');
			}
		});
	}
}
