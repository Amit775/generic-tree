import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TemplatesService, TreeNodeTemplates } from '../../core/templates.service';
import { INodeState } from '../../models/node.state';

@Component({
  selector: 'tree-node-collection',
  templateUrl: './node-collection.component.html',
  styleUrls: ['./node-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeCollectionComponent implements OnInit, AfterViewInit {

  @Input('templates') set templatesInput(value: TreeNodeTemplates | undefined) {
    if (!value) return;
    this.templates.setTemplates(value);
  }
  
  @Input() nodes: INodeState[] | null = [];
  ngAfterViewInit(): void { }
  constructor(private templates: TemplatesService) { }

  ngOnInit(): void {
  }

}
