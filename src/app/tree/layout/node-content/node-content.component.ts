import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-content',
	templateUrl: './node-content.component.html',
	styleUrls: ['./node-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnChanges {
	public template!: TreeNodeTemplate | null;
	public context!: TreeNodeContext;
	public node!: INodeState;

	@Input() nodeId!: string;

	constructor(
		private service: NodeService,
		private templates: TemplatesService
	) { }

	ngOnChanges(): void {
		this.template = this.templates.getTemplate('content');
		this.context = { node$: this.service.selectNode() };
		this.node = this.service.getNode();
	}
}
