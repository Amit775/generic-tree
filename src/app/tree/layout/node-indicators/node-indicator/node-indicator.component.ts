import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeQuery } from 'src/app/tree/core/node/node.query';
import { IIndicator } from 'src/app/tree/models/indicator.model';
import { INodeState } from '../../../models/node.state';

@Component({
	selector: 'tree-node-indicator',
	templateUrl: './node-indicator.component.html',
	styleUrls: ['./node-indicator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeIndicatorComponent implements OnInit {

	@Input() node!: INodeState;
	@Input() indicator!: IIndicator;

	@Output() toggled = new EventEmitter();

	constructor(private query: NodeQuery) { }
	flag$!: Observable<boolean>;

	ngOnInit(): void {
		this.flag$ = this.query.select(node => node?.flags[this.indicator.flag] == true);
	}

	toggle(): void {
		this.toggled.emit();
	}
}
