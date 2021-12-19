import { IIndicator } from "../layout/node-indicators/node-indicator/node-indicator.component";
import { Flags } from "./flags.model";

export interface INodeState {
    id: string;
    children?: string[];
    path: string[];
    flags: Flags;
    indexInParent: number;
    data: any;
    indicators?: IIndicator[];
  }