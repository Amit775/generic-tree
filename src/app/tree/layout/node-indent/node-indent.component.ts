import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation } from "@angular/core";
import { map, Observable } from "rxjs";
import { NodeService } from "../../core/node/node.service";
import { INodeState } from "../../models/node.state";

@Component({
	selector: 'tree-node-indent',
	templateUrl: './node-indent.component.html',
	styleUrls: ['./node-indent.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class NodeIndentComponent implements OnChanges {
	@Input() nodeId!: string;

	public node$!: Observable<INodeState>;
	public path$!: Observable<string[]>;
	public isSelected$!: Observable<boolean>;

	constructor(
		private service: NodeService
	) { }

	ngOnChanges(): void {
		this.node$ = this.service.query.select();
		this.path$ = this.service.query.treeQuery.selectNodePath(this.nodeId).pipe(map(path => path.slice(2)));
		this.isSelected$ = this.service.query.isSelected$();
	}
}