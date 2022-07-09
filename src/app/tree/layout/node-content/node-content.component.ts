import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { SubTree } from '../../core/tree/tree.store';
import { INodeState } from '../../models/node.state';
import { INodesState } from '../../models/tree.state';

@Component({
	selector: 'tree-node-content',
	templateUrl: './node-content.component.html',
	styleUrls: ['./node-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnInit, AfterViewInit {
	template!: Observable<TemplateRef<TreeNodeContext> | null>;
	context!: TreeNodeContext;

	@Input() node!: INodesState;

	constructor(
		private service: NodeService,
		private templates: TemplatesService
	) { }

	ngOnInit(): void {
		this.template = this.templates.selectTemplate$('content');
		this.context = { node$: this.service.selectNode() }
	}

	ngAfterViewInit(): void { }
}
