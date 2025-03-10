import { PIXI } from "@/pixi";

export const entitySetter = (data: IGameData, work: string, world: PIXI.Container): PIXI.Sprite | null => {
  const entityData = data.entities[work];
  const item = entityData[0];

  const entity = new PIXI.Sprite(PIXI.Texture.WHITE);
  entity.anchor.set(0.5);
  entity.width = item.width;
  entity.height = item.height;
  entity.x = item.x;
  entity.y = item.y;
  entity.tint = item.color;
  entity.zIndex = 9;

  world.addChild(entity);

  return entity;
};


interface IGameData {
  identifier: string;
  uniqueIdentifier: string;
  x: number;
  y: number;
  width: number;
  height: number;
  bgColor: string;
  neighbourLevels: [];
  customFields: object;
  layers: [];
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
  workPeriod: string;
  workTitle: string;
  workDescription: string;
}
