import { EntityState } from "@datorama/akita";
import { INodeState } from "./node.state";

export interface INodesState extends EntityState<INodeState, string> { }
