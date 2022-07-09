import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-wrapper',
	templateUrl: './node-wrapper.component.html',
	styleUrls: ['./node-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {
	template!: TemplateRef<TreeNodeContext> | null;
	context!: TreeNodeContext;
	isActive$!: Observable<boolean | undefined>;
	subTree!: SubTree;
	path!: string[];

	@Input() node!: INodeState;
	constructor(
		private treeQuery: TreeQuery,
		private service: NodeService,
		private templates: TemplatesService,
	) { }

	toggleExpand(): void {
		this.service.toggleFlag('expanded');
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

	ngOnInit(): void {
		this.template = this.templates.getTemplate('wrapper');
		this.context = { node$: this.service.selectNode() };
		this.isActive$ = this.service.selectFlag('active');
		this.subTree = this.treeQuery.getEntity(this.node.id)!;
		this.path = this.treeQuery.getNodePath(this.subTree.id);
	}

}
