import { PIXI } from "@/pixi";

export const switchSprite = (newSprite: PIXI.AnimatedSprite, currentSprite: PIXI.AnimatedSprite, app: PIXI.Application) =>{
  if(newSprite !== currentSprite){
      newSprite.x = currentSprite.x;
      newSprite.y = currentSprite.y;
      newSprite.anchor.set(0.5);

      app.stage.removeChild(currentSprite);
      currentSprite = newSprite
      app.stage.addChild(currentSprite)

      currentSprite.animationSpeed = 0.12
      currentSprite.play();
  }
}
