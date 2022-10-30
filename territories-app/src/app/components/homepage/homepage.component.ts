import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DummyApi } from 'src/app/utils/DummyApi';
import { transformTerritories } from 'src/app/utils/Utils';
import { Territories } from 'src/app/models/territories';
import { FlatTreeNode } from 'src/app/models/flatTreeNode';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
})
export class HomepageComponent implements OnInit {
  rawData: any = [];
  transformedData: any = [];
  currentUser: any = {};

  private _transformer = (node: Territories, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatTreeNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, private dataService: DataService) {}

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  async ngOnInit(): Promise<void> {
    this.dataService.currentLoggedInUser.subscribe(
      (currentUser) => (this.currentUser = currentUser)
    );
    if (!this.currentUser) this.router.navigate(['account/login']);

    this.rawData = DummyApi.getTerritories();
    this.transformedData = transformTerritories(this.rawData);
    this.dataSource.data = this.transformedData;
  }
}
