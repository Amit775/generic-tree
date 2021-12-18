import { Injectable } from "@angular/core";

@Injectable()
export class NodeService  {

    private _id: string | undefined;

    init(id: string): void {
        if (this._id != null) throw 'initialized twice ' + id;
        this._id = id;
    }
}