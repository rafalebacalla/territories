import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { DummyApi } from 'src/app/utils/DummyApi';
import { transformTerritories } from 'src/app/utils/Utils';
import { Territories } from 'src/app/models/territories';
import { FlatTreeNode } from 'src/app/models/flatTreeNode';
import { isLoggedIn } from 'src/app/utils/AuthChecker';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  rawData : any = [];
  transformedData: any = [];

  private _transformer = (node: Territories, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router) {
    if (!isLoggedIn()) this.router.navigate(['account/login']);
  }

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  async ngOnInit(): Promise<void> {
    this.rawData = DummyApi.getTerritories();
    this.transformedData = transformTerritories(this.rawData);
    this.dataSource.data = this.transformedData;
  }
}
