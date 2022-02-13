import { Flags } from "./flags.model";
import { INodeState } from "./node.state";
import { ITreeState } from "./tree.state";

export interface IIndicator {
	flag: keyof Flags;
	onIcon?: string;
	offIcon?: string;
	onAction?: (node: INodeState, state: ITreeState) => void;
	offAction?: (node: INodeState, state: ITreeState) => void;
  }