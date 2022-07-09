import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TemplatesService, TreeNodeContext, TreeNodeTemplates } from '../../core/templates.service';
import { NodesQuery } from '../../core/nodes/nodes.query';
import { NodesService } from '../../core/nodes/nodes.service';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';
import { SubTree } from '../../core/tree/tree.store';
import { TreeQuery } from '../../core/tree/tree.query';
import { filterNilValue } from '@datorama/akita';

@Component({
	selector: 'tree-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

	@ContentChild('treeNodeContent', { read: TemplateRef }) 
	set treeNodeContentTemplate(value: TemplateRef<TreeNodeContext> | undefined) {
		this.templatesService.setTemplates({ content: value });
	}
	@ContentChild('treeNodeWrapper', { read: TemplateRef }) 
	set treeNodeWrapperTemplate(value: TemplateRef<TreeNodeContext> | undefined) {
		this.templatesService.setTemplates({ wrapper: value });
	}
	@ContentChild('treeNodeLoading', { read: TemplateRef }) 
	set treeNodeLoadingTemplate(value: TemplateRef<TreeNodeContext> | undefined) {
		this.templatesService.setTemplates({ loading: value });
	}
	@ContentChild('treeNodeFull', { read: TemplateRef }) 
	set treeNodeFullTemplate(value: TemplateRef<TreeNodeContext> | undefined) {
		this.templatesService.setTemplates({ full: value });
	}

	constructor(
		private query: TreeQuery,
		private dragService: NodeDragDropService,
		private templatesService: TemplatesService
	) { }

	public virtualRoot$!: Observable<SubTree>;

	ngOnInit(): void {
		this.virtualRoot$ = this.query.selectEntity('root').pipe(filterNilValue());
	}

	onDrop(event: CdkDragDrop<SubTree>): void {
		this.dragService.onDragDrop(event);
	}
}
