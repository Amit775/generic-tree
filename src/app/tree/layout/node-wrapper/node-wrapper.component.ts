import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
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
  isActive$!: Observable<boolean | undefined>;

  @Input() node!: INodeState;
  constructor(private service: NodeService, private templates: TemplatesService) { }

  toggleExpand(): void {
    this.service.toggleFlag('expanded');
  }

  toggleActive(event: MouseEvent): void {  
    const multiple = event.ctrlKey;
    this.service.toggleFlag('active', !multiple);
  }



  ngOnInit(): void {
    this.template = this.templates.getTemplate('wrapper');
    this.context = { node: this.service.get() };
    this.isActive$ = this.service.selectFlag('active');
  }

}
