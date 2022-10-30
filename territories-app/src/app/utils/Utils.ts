import { Territories } from '../models/territories';

export function transformTerritories(raw: { data: any[] }): any {
  let rawData = raw.data;
  let transformedData: any[] = [];

  rawData.forEach((territory) => {
    if (!territory.parent) {
      transformedData.push(transFormTerritory(rawData, territory));
    }
  });

  return transformedData;
}

function transFormTerritory(rawData: any, raw: any): any {
  let tempTerritory: Territories = {
    id: raw.id,
    name: raw.name,
    children: [],
  };

  let children = findChildren(rawData, tempTerritory);
  tempTerritory.children = children;

  return tempTerritory;
}

function findChildren(rawData: any[], parent: any) {
  let children: any[] = [];

  rawData.forEach((territory) => {
    if (territory.parent === parent.id) {
      children.push(transFormTerritory(rawData, territory));
    }
  });

  return children;
}
