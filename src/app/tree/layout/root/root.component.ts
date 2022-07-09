import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import { Observable } from 'rxjs';
import { TemplatesService, TreeNodeTemplate } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { SubTree } from '../../core/tree/tree.store';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';

@Component({
	selector: 'tree-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent implements OnInit {

	@ContentChild('treeNodeContent', { read: TemplateRef }) 
	set treeNodeContentTemplate(value: TreeNodeTemplate | undefined) {
		this.templatesService.setTemplates({ content: value });
	}
	@ContentChild('treeNodeWrapper', { read: TemplateRef }) 
	set treeNodeWrapperTemplate(value: TreeNodeTemplate | undefined) {
		this.templatesService.setTemplates({ wrapper: value });
	}
	@ContentChild('treeNodeLoading', { read: TemplateRef }) 
	set treeNodeLoadingTemplate(value: TreeNodeTemplate | undefined) {
		this.templatesService.setTemplates({ loading: value });
	}
	@ContentChild('treeNodeFull', { read: TemplateRef }) 
	set treeNodeFullTemplate(value: TreeNodeTemplate | undefined) {
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
