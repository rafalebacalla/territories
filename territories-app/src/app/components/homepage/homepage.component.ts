import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { DummyApi } from 'src/app/utils/DummyApi';
import { transformTerritories } from 'src/app/utils/Utils';
import { Territories } from 'src/app/models/territories';
import { FlatTreeNode } from 'src/app/models/flatTreeNode';


const TREE_DATA: Territories[] = [
  {
    name: 'Western Visayas',
    children: [
      {
        name: 'Negros Occidental',
        children: [
          {name: 'Bacolod'}
        ]
      }
    ]
  },
  {
    name: 'Central Visayas',
    children: [
      {
        name: 'Cebu',
        children: [{name: 'Cebu City'}, {name: 'Lapu-Lapu'}],
      },
      {
        name: 'Bohol',
        children: [{name: 'Tagbilaran'}, {name: 'Panglao'}],
      },
    ],
  },
];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  rawData : any = undefined;
  transformedData: any = undefined;

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

  constructor() {
    this.rawData = DummyApi.getTerritories();
    this.transformedData = transformTerritories(this.rawData);
    this.dataSource.data = this.transformedData;
  }

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  ngOnInit(): void {
    
  }

}
