import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";
import { NodeQuery } from "./node.query";
import { NodeStore } from "./node.store";

@Injectable()
export class NodeService {
    constructor(private query: NodeQuery, private store: NodeStore) { }

    init(id: string): void {
        this.store.id = id;
        this.query.id = id;
    }

    get(): INodeState {
        return this.query.get();
    }

    toggleFlag(flag: keyof Flags): void {
        return this.store.update(node => ({
            ...node,
            flags: {
                ...node.flags,
                [flag]: !node.flags[flag]
            }
        }));
    }

    selectFlag(flag: keyof Flags): Observable<boolean | undefined> {
        return this.query.select(node => node?.flags[flag]);
    }
}