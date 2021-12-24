import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnInit,
  TemplateRef
} from '@angular/core';
import { NodeService, TreeNodeContext } from '../node/node.service';


@Component({
  selector: 'tree-node-content',
  templateUrl: './node-content.component.html',
  styleUrls: ['./node-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeContentComponent implements OnInit, AfterViewInit {
  template!: TemplateRef<TreeNodeContext> | null;
  context!: TreeNodeContext;
  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.template = this.service.getTemplate('content');
    this.context = {
      $implicit: this.service,
      node: this.service.getNode(),
      templates: this.service.getAllTemplates()
    }
  }

  ngAfterViewInit(): void { }
}
