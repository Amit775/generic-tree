import { NodeService } from "../core/node/node.service";
import { Flags } from "./flags.model";

export interface INodeState<T = any> {
    id: string;
    flags: Partial<Flags>;
    data: T;
    service?: NodeService;
  }