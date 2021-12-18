import { EntityState } from "@datorama/akita";
import { INodeState } from "./node.state";

export interface ITreeState extends EntityState<INodeState, string> { }
