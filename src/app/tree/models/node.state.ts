import { Flags } from "./flags.model";

export interface INodeState {
    id: string;
    children?: string[];
    path: string[];
    flags: Flags;
    indexInParent: number;
    data: any;
  }