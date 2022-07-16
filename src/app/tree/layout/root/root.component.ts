import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { HashMap } from '@datorama/akita';
import { NodesService } from '../../core/nodes/nodes.service';
import { TemplatesService, TreeNodeTemplate } from '../../core/templates.service';
import { TreeQuery } from '../../core/tree/tree.query';
import { TreeService } from '../../core/tree/tree.service';
import { SubTree } from '../../core/tree/tree.store';
import { INodeState } from '../../models/node.state';

@Component({
	selector: 'tree-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent<T extends { id: string, parentId: string }> implements OnInit {

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

	@Input() rootId: string = 'root';
	@Input() data: unknown[] = [];

	public root: SubTree | undefined;

	constructor(
		private query: TreeQuery,
		private templatesService: TemplatesService,
		private treeService: TreeService,
		private nodesService: NodesService,
	) { }

	ngOnInit(): void {
		this.root = this.query.getEntity(this.rootId);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes['data']) {
			this.buildStores(changes['data'].currentValue);
		}
	}


	private buildStores(nodes: T[]): void {
		this.treeService.setSubTrees(this.buildTree(nodes));
		this.nodesService.setNodes(this.convertNodes(nodes));
	}

	private buildTree(nodes: T[]): HashMap<SubTree> {
		const indexedByParentId = this.indexByParentId(nodes);
		const subTrees: HashMap<SubTree> = {
			root: {
				id: 'root',
				parentId: null,
				children: indexedByParentId['root'].map(child => child.id),
				isExpanded: true
			}
		};

		function buildSubTree(parentId: string): void {
			const { children } = subTrees[parentId];

			children?.forEach(childId => {
				subTrees[childId] = {
					id: childId,
					parentId: parentId,
					children: indexedByParentId[childId]?.map(grandChild => grandChild.id),
					isExpanded: false
				}

				buildSubTree(childId);
			});
		}

		buildSubTree('root');

		return subTrees;
	}

	private indexByParentId(nodes: T[]): HashMap<T[]> {
		const indexedByParentId: HashMap<T[]> = nodes.reduce((result, data) => {
			const parentId = data.parentId || 'root';
			if (!Object.keys(result).includes(parentId)) {
				result[parentId] = [];
			}

			result[parentId].push(data);
			return result;
		}, {} as HashMap<T[]>);
		return indexedByParentId;
	}

	private convertNodes(datas: T[]): INodeState[] {
		return [{
			data: { virtualRoot: true },
			id: 'root',
			flags: {}
		},
		...datas.map(data => this.convert(data))
		];
	}

	private convert(data: T): INodeState {
		return {
			data,
			flags: {},
			id: data.id,
		}
	}
}
