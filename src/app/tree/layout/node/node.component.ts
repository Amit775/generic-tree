import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { NodesQuery } from '../../core/nodes/nodes.query';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-node',
	templateUrl: './node.component.html',
	styleUrls: ['./node.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {
	template!: TemplateRef<TreeNodeContext> | null;
	context!: TreeNodeContext;

	@Input() node!: INodeState;

	constructor(
		private nodesQuery: NodesQuery,
		private service: NodeService,
		private templates: TemplatesService,
		private dragService: NodeDragDropService,
	) { }

	ngAfterViewChecked(): void {
	}

	ngDoCheck(): void {

	}
	ngOnInit(): void {
		this.service.init(this.node.id);
		console.log(this.node);
		this.template = this.templates.getTemplate('full');
		this.context = { node$: this.service.selectNode() }
	}

	ngAfterViewInit(): void { }

	onDrop(event: CdkDragDrop<any>): void {
		this.dragService.onDragDrop(event);
	}
}
