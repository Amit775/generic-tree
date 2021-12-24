import { Injectable, isDevMode, TemplateRef } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable } from "rxjs";
import { TreeQuery } from "../../core/tree/tree.query";
import { TreeStore } from "../../core/tree/tree.store";
import { Flags } from "../../models/flags.model";
import { INodeState } from "../../models/node.state";

export type ContextOf<T> = T extends TemplateRef<infer U> ? U : never;

export interface TreeNodeContext {
    $implicit: NodeService;
    node: INodeState;
    templates: TreeNodeTemplates;
}

export interface TreeNodeTemplates {
    content: TemplateRef<TreeNodeContext> | null;
    loading: TemplateRef<TreeNodeContext> | null;
    wrapper: TemplateRef<TreeNodeContext> | null;
    full: TemplateRef<TreeNodeContext> | null;
}

const nullTreeNodeTemplates: TreeNodeTemplates = {
    content: null,
    loading: null,
    wrapper: null,
    full: null
}

@Injectable()
export class NodeService {

    private templates$ = new BehaviorSubject<TreeNodeTemplates>(nullTreeNodeTemplates);
    public selectAllTemplates$(): Observable<TreeNodeTemplates> {
        return this.templates$.asObservable();
    }
    public selectTemplate$<K extends keyof TreeNodeTemplates>(key: K): Observable<TreeNodeTemplates[K] | null> {
        return this.templates$.asObservable().pipe(
            map(templates => templates[key]!),
            distinctUntilChanged()
        );
    }

    public getAllTemplates(): TreeNodeTemplates {
        return this.templates$.value;
    }

    public getTemplate<K extends keyof TreeNodeTemplates>(key: K): TreeNodeTemplates[K] | null {
        return this.templates$.value[key];
    }

    constructor(private store: TreeStore, private query: TreeQuery) { }
    private _id: string | undefined;

    init(id: string): void {
        if (this._id != null) throw 'initialized twice ' + id;
        this._id = id;
    }

    toggleExpand(): void {
        this.assertInitialized();
        this.store.update(this._id!, node => ({
            ...node,
            flags: {
                ...node.flags,
                expanded: !node.flags['expanded']
            }
        }))
    }

    setTemplates(templates: Partial<TreeNodeTemplates>): void {
        this.templates$.next({ ...this.templates$.value, ...templates });
    }

    selectFlag(flag: keyof Flags): Observable<boolean> {
        this.assertInitialized();
        return this.query.selectEntity(this._id!).pipe(
            map(node => node!.flags[flag]),
            distinctUntilChanged()
        )
    };

    selectNode(): Observable<INodeState> {
        this.assertInitialized();
        return this.query.selectEntity(this._id!) as Observable<INodeState>;
    }

    getNode(): INodeState {
        const node = this.query.getEntity(this._id!);
        if (node == null) throw `not found with id - ${this._id}`;

        return node;
    }


    private assertInitialized(): void {
        if (!isDevMode) return;
        if (!this._id) throw 'service must be initialized first';
    }
}