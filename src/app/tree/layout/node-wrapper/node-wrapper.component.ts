import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
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
export class NodeWrapperComponent implements OnChanges {
	@Input() nodeId!: string;

	public template!: TreeNodeTemplate | null;
	public context!: TreeNodeContext;
	public isSelected$!: Observable<boolean | undefined>;
	public path!: string[];
	public subTree!: SubTree;

	constructor(
		private treeQuery: TreeQuery,
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	ngOnChanges(): void {
		this.template = this.templates.getTemplate('wrapper');
		this.context = { node$: this.service.selectNode() };
		this.isSelected$ = this.service.query.isSelected$();
		this.path = this.treeQuery.getNodePath(this.nodeId);
		this.subTree = this.treeQuery.getEntity(this.nodeId)!;
	}

	toggleSelected(event: MouseEvent): void {
		this.service.WithinSingleUpdate(() => {
			const multiple = event.ctrlKey;
			this.service.toggleSelected(!multiple)
			if (!multiple && this.subTree.children != null) {
				this.service.toggleExpand();
			}
		});
	}
}
