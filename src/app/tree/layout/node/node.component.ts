import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, Input, OnInit, TemplateRef } from '@angular/core';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { NodeDragDropService } from '../../features/node-drag-drop/node-drop-slot/node-drag-drop.service';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {
  template!: TemplateRef<TreeNodeContext> | null;
  context!: TreeNodeContext;

  @Input() node!: INodeState;

  constructor(
    private service: NodeService, 
    private templates: TemplatesService, 
    private dragService: NodeDragDropService
    ) { }

  ngAfterViewChecked(): void {
  }

  ngDoCheck(): void {

  }
  ngOnInit(): void {
    this.service.init(this.node.id);
    this.template = this.templates.getTemplate('full');
    this.context = { node$: this.service.selectNode() }
  }

  ngAfterViewInit(): void {
  }
}
