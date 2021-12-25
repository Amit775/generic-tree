import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-wrapper',
  templateUrl: './node-wrapper.component.html',
  styleUrls: ['./node-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWrapperComponent implements OnInit {
  template!: TemplateRef<TreeNodeContext> | null;
  context!: TreeNodeContext;

  @Input() node!: INodeState;
  constructor(private service: NodeService, private templates: TemplatesService) { }

  toggleExpand(): void {
    this.service.toggleFlag('expanded');
  }

  ngOnInit(): void {
    this.template = this.templates.getTemplate('wrapper');
    this.context = {
      node: this.service.get(),
      templates: this.templates.getAllTemplates()
    }
  }

}
