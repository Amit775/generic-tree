import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable } from "rxjs";
import { TreeStore } from "../../core/tree/tree.store";

export type ContextOf<T> = T extends TemplateRef<infer U> ? U : never;

export interface TreeNodeContext {
    $implicit: NodeService;
    node: NodeService;
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

    templates$ = new BehaviorSubject<TreeNodeTemplates>(nullTreeNodeTemplates);
    public selectTemplate$<K extends keyof TreeNodeTemplates>(key: K): Observable<TreeNodeTemplates[K] | null> {
        return this.templates$.asObservable().pipe(
            map(templates => templates[key]!),
            filter(v => v != null),
            distinctUntilChanged()
        );
    }

    constructor(private store: TreeStore) { }
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

    private assertInitialized(): void {
        if (!this._id) throw 'service must be initialized first';
    }

    setTemplates(templates: Partial<TreeNodeTemplates>): void {
        this.templates$.next({ ...this.templates$.value, ...templates });
    }
}