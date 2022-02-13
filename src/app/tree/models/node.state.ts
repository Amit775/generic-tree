import { NodeService } from "../core/node/node.service";
import { IIndicator } from "../layout/node-indicators/node-indicator/node-indicator.component";
import { Flags } from "./flags.model";

export interface INodeState<T = any> {
	id: string;
	children?: INodeState[];
	path: INodeState[];
	flags: Partial<Flags>;
	data: T;
	indicators?: IIndicator[];
	service?: NodeService;
}