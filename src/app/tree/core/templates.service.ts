import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { INodeState } from "../models/node.state";


export interface TreeNodeContext {
    node: INodeState;
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

@Injectable({ providedIn: 'root' })
export class TemplatesService {
    private _templates: BehaviorSubject<TreeNodeTemplates> = new BehaviorSubject(nullTreeNodeTemplates);

    public selectAllTemplates$(): Observable<TreeNodeTemplates> {
        return this._templates.asObservable();
    }

    public selectTemplate$<K extends keyof TreeNodeTemplates>(key: K): Observable<TreeNodeTemplates[K] | null> {
        return this._templates.asObservable().pipe(
            map(templates => templates[key]!),
            distinctUntilChanged()
        );
    }

    public getAllTemplates(): TreeNodeTemplates {
        return this._templates.value;
    }

    public getTemplate<K extends keyof TreeNodeTemplates>(key: K): TreeNodeTemplates[K] | null {
        return this._templates.value[key];
    }

    public setTemplates(templates: Partial<TreeNodeTemplates>): void {
        if (this.comparer(this._templates.value, templates)) return;

        this._templates.next({ ...this._templates.value, ...templates });
    }

    private comparer(old: Partial<TreeNodeTemplates>, news: Partial<TreeNodeTemplates>): boolean {
        return old.full === news.full &&
            old.content === news.content &&
            old.loading === news.loading &&
            old.wrapper === news.wrapper;
    }
}