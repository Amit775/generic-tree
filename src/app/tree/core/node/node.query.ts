import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { INodeState } from "../../models/node.state";
import { NodesQuery } from "../nodes/nodes.query";

@Injectable()
export class NodeQuery {
    private _id!: string;
    public set id(value: string) {
        if (value == null) return;
        if (!this.query.hasEntity(value)) {
            throw `Node Query for id - ${value} is not included in Tree Query`;
        }
        this._id = value;
    }
    public get id(): string {
        return this._id;
    }
    
    constructor(public query: NodesQuery) { }

    get(): INodeState;
    get<R>(project: (state?: INodeState) => R): R;
    get<R>(project?: (state?: INodeState) => R): R | INodeState {
        const entity = this.query.getEntity(this._id)!;
        return project ? project(entity) : entity;
    }

    select(): Observable<INodeState>;
    select<R>(project: (state?: INodeState) => R): Observable<R>;
    select<R>(project?: (state?: INodeState) => R): Observable<R | INodeState> { 
        const entity$ = this.query.selectEntity(this._id) as Observable<INodeState>;
        return project ? entity$.pipe(map(project)) : entity$;
    }
}