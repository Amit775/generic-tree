import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnInit,
  TemplateRef
} from '@angular/core';
import { NodeService } from '../../core/node/node.service';
import { TemplatesService, TreeNodeContext } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';


@Component({
  selector: 'tree-node-content',
  templateUrl: './node-content.component.html',
  styleUrls: ['./node-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnInit, AfterViewInit {
  template!: TemplateRef<TreeNodeContext> | null;
  context!: TreeNodeContext;
  constructor(private service: NodeService, private templates: TemplatesService) { }

  ngOnInit(): void {
    this.template = this.templates.getTemplate('content');
    this.context = { node$: this.service.selectNode() }
  }

  public get node(): INodeState<{ display: string }> {
    return this.service.getNode()
  }

  ngAfterViewInit(): void { }
}
