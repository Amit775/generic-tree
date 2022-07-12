import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
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
export class NodeComponent implements OnInit, AfterViewChecked {
	template!: TreeNodeTemplate | null;
	context!: TreeNodeContext;

	public _subTree!: SubTree;
	@Input() set subTree(value: SubTree) { this._subTree = value; console.log('change', this.subTree?.id) }
	public get subTree(): SubTree { return this._subTree; }

	constructor(
		private service: NodeService,
		private templates: TemplatesService,
		private dragService: NodeDragDropService,
	) { }

	ngAfterViewChecked(): void {
		console.log(`change detection in node ${this._subTree.id}`);
	}

	ngOnInit(): void {
		this.service.init(this._subTree.id);
		this.template = this.templates.getTemplate('full');
		this.context = { node$: this.service.selectNode() }
	}

	onDrop(event: CdkDragDrop<any>): void {
		this.dragService.onDragDrop(event);
	}
}
