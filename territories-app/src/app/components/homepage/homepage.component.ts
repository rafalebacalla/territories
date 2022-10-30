import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface Territories {
  name: string;
  children?: Territories[];
}

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

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  private _transformer = (node: Territories, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
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
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  callDummyApi() {

  }

}
