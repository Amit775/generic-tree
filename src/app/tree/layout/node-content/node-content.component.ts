import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node-content',
	templateUrl: './node-content.component.html',
	styleUrls: ['./node-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnInit {
	template!: TreeNodeTemplate | null;
	context!: TreeNodeContext;

	@Input() nodeId!: string;

	public get node(): INodeState {
		return this.service.getNode();
	}

	constructor(
		private service: NodeService,
		private templates: TemplatesService
	) { }

	ngOnInit(): void {
		this.template = this.templates.getTemplate('content');
		this.context = { node$: this.service.selectNode() }
	}
}
