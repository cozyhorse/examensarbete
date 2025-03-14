import type { IGameData } from "@/interfaces/EntityInterface";
import { PIXI } from "@/pixi";

export const entitySetter = (data: IGameData, work: string, world: PIXI.Container): PIXI.Sprite | null => {
  const entityData = data.entities[work];
  const item = entityData[0];

  const entity = new PIXI.Sprite();
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


