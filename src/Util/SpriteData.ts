import { PIXI } from "@/pixi";


export const createSprite = async (data: any) => {
  const spritesheet = new PIXI.Spritesheet(PIXI.Texture.from(data.meta.image), data);
  await spritesheet.parse();
  return new PIXI.AnimatedSprite(spritesheet.animations.movement);
}
