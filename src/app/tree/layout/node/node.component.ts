import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NodeQuery } from '../../core/node/node.query';
import { NodeService } from '../../core/node/node.service';
import { NodeStore } from '../../core/node/node.store';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService, NodeQuery, NodeStore]
})
export class NodeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  template!: TemplateRef<TreeNodeContext> | null;
  context!: TreeNodeContext;

  @Input() node!: INodeState;

  constructor(private service: NodeService, private templates: TemplatesService) { }

  ngAfterViewChecked(): void {
    console.log('check node', this.node.id);
  }

  ngOnInit(): void {
    this.service.init(this.node.id);
    this.template = this.templates.getTemplate('full');
    this.context = { node: this.service.get() }
  }

  ngAfterViewInit(): void { }

}
