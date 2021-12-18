
interface TreeNodeData {
    display?: string;
    children?: TreeNodeData[];
  }

class TreeNode<T = any, P = any> {

    static get virtualRoot(): TreeNode {
      return new TreeNode({ virtual: true }, undefined, 0);
    }
    constructor(
      public readonly data: any,
      public readonly parent: TreeNode<P> | undefined,
      public readonly index: number
    ) {}
  
    private _children: TreeNode[] | undefined;
    public get children(): TreeNode[] | undefined {
      if (!this._children) this._initChildren();
      return this._children;
    }
  
    private _initChildren(): void {
      if (this.data.children) {
        this.data.children.map((data: TreeNodeData, index: number) =>
          this._convert(data, index)
        );
      }
    }
  
    private _convert(data: TreeNodeData, index: number): TreeNode {
      return new TreeNode(data, this, index);
    }
  
    public get display(): string {
      return this.data.display ?? '';
    }
  
    public get level(): number {
      return this.parent ? this.parent.level + 1 : 0;
    }
  }
  