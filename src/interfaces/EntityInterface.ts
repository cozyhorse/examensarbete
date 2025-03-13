interface IGameData {
  identifier: string;
  uniqueIdentifer: string;
  x: number;
  y: number;
  width: number;
  height: number;
  bgColor: string;
  neighbourLevels: string[];
  customFields: object;
  layers: string[];
  entities: Record<string, IEntity[]>;
}

interface IEntity {
  id: string;
  iid: string;
  layer: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  customFields: ICustomFieldInEntity;
}

interface ICustomFieldInEntity {
  workPlace: string;
  workYear: string;
  workTitle: string;
  workDescription: string;
}


export type { IEntity, IGameData, };
