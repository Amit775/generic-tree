import { Injectable } from "@angular/core";
import { filterNilValue } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { INodeState } from "../../models/node.state";
import { DataQuery } from "../nodes/nodes.query";
import { TreeQuery } from "../tree/tree.query";

@Injectable()
export class NodeQuery {
	private _id!: string;
	public set id(value: string) {
		if (value == null) return;
		if (!this.dataQuery.hasEntity(value)) {
			throw `Node Query for id - ${value} is not included in Data Query`;
		}
		if (!this.treeQuery.hasEntity(value)) {
			throw `Node Query for id - ${value} is not included in Tree Query`;
		}
		this._id = value;
	}
	public get id(): string {
		return this._id;
	}

	constructor(
		public dataQuery: DataQuery,
		public treeQuery: TreeQuery,
	) { }

	get(): INodeState;
	get<R>(project: (state?: INodeState) => R): R;
	get<R>(project?: (state?: INodeState) => R): R | INodeState {
		const entity = this.dataQuery.getEntity(this._id)!;
		return project ? project(entity) : entity;
	}

	select(): Observable<INodeState>;
	select<R>(project: (state?: INodeState) => R): Observable<R>;
	select<R>(project?: (state?: INodeState) => R): Observable<R | INodeState> {
		const entity$ = this.dataQuery.selectEntity(this._id).pipe(filterNilValue());
		return project ? entity$.pipe(map(project)) : entity$;
	}

	isExpanded(): boolean {
		return this.treeQuery.isExpanded(this._id);
	}

	isExpanded$(): Observable<boolean> {
		return this.treeQuery.isExpanded$(this._id);
	}

	isSelected(): boolean {
		return this.treeQuery.isSelected(this._id);
	}

	isSelected$(): Observable<boolean> {
		return this.treeQuery.isSelected$(this._id);
	}
}