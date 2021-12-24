import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { INodeState } from '../../models/node.state';
import { NodeService, TreeNodeTemplates } from './node.service';

@Component({
  selector: 'tree-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeService]
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Input() node!: INodeState;
  @Input() set templates(templates: Partial<TreeNodeTemplates>) {
    if (!templates || Object.keys(templates).length === 0) return;
    this.service.setTemplates(templates);

  };
  constructor(private service: NodeService) { }

  ngOnInit(): void {
    this.service.init(this.node.id);
  }

  ngAfterViewInit(): void {
  }

}
