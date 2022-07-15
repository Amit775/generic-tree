import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { NodeQuery } from "../../core/node/node.query";
import { NodeService } from "../../core/node/node.service";
import { TreeQuery } from "../../core/tree/tree.query";
import { INodeState } from "../../models/node.state";

@Component({
	selector: 'tree-node-indent',
	templateUrl: './node-indent.component.html',
	styleUrls: ['./node-indent.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class NodeIndentComponent implements OnInit {
	@Input() nodeId!: string;

	public node$!: Observable<INodeState>;
	public path$!: Observable<string[]>;
	public active$!: Observable<boolean | undefined>;

	constructor(
		private query: NodeQuery,
		private treeQuery: TreeQuery,
		private service: NodeService
	) { }

	ngOnInit(): void {
		this.node$ = this.query.select();
		this.path$ = this.treeQuery.selectNodePath(this.nodeId).pipe(map(path => path.slice(2)), tap(x => console.log(this.nodeId, x.length)));
		this.active$ = this.service.selectFlag('active');
	}
}