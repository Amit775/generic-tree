import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { TemplatesService, TreeNodeContext, TreeNodeTemplate } from '../../core/templates.service';
import { SubTree } from '../../core/tree/tree.store';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';

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

	@Input() subTree!: SubTree;

	constructor(
		private service: NodeService,
		private templates: TemplatesService,
		private dragService: NodeDragDropService,
	) { }

	ngOnInit(): void {
		this.service.init(this.subTree.id);
		this.template = this.templates.getTemplate('full');
		this.context = { node$: this.service.selectNode() }
	}

	onDrop(event: CdkDragDrop<any>): void {
		this.dragService.onDragDrop(event);
	}
}
