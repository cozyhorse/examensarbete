<template>
  <div class="container">
    <div class="game" ref="gameContainer"></div>
    <!-- <v-btn @click="goBack">
      Back
    </v-btn> -->
  </div>
</template>

<script lang="ts" setup>
import { PIXI } from '@/pixi';
import CharacterWalk from '@/assets/spritesheet/CharacterWalk.png'
import { dataWalkDown, dataWalkUp, dataWalkLeft, dataWalkRight } from '@/animation/Character';
import { nextTick, onMounted, ref } from 'vue';
import { createSprite } from '@/Util/SpriteData';
import layer from '@/Util/LayerImporter';
import {
  water,
  ground,
  road,
  flowerRed,
  flowerWhite,
  greeneryMisc,
  greenery,
  greenery2,
  greenery3,
  greenery4,
  rocks,
  rocks2,
  props,
  propsbehind,
  gate,
  well,
  buildings,
  buildingsFront,
  buildings2,
  buildings2Front,
} from '@/imports/Levels';
import { data } from '@/imports/LevelData';
import { Assets } from 'pixi.js';
import router from '@/router';

const gameContainer = ref<HTMLElement | null>(null)
const keys: Record<string, boolean> = {};
let currentSprite: PIXI.AnimatedSprite;
let newSprite: PIXI.AnimatedSprite;
const speed: number = 1.5;
const collisionMap = ref<number[][]>([]);
const tileSize = 16;

onMounted(async () => {
  await loadCollisionData();
  await nextTick();
  await initGame();
})
const initGame = async () => {
  if (!gameContainer.value) {
    console.log("No gamecontainer");
    return
  }

  const app = new PIXI.Application();
  await app.init({
    width: data.width,
    height: data.height,
    backgroundColor: 'grey'
  })
  gameContainer.value.appendChild(app.canvas)

  const world = new PIXI.Container();
  app.stage.addChild(world)
  world.sortableChildren = true

  const waterTexture = await layer(water)
  const groundTexture = await layer(ground)
  const roadTexture = await layer(road)
  const greeneryFirst = await layer(greenery)
  const greenerySecond = await layer(greenery2)
  const greeneryThird = await layer(greenery3)
  const greeneryFourth = await layer(greenery4)
  const greeneryMiscTexture = await layer(greeneryMisc)
  const propsTexture = await layer(props)
  const propsBehindTexture = await layer(propsbehind)
  const buildings1Back = await layer(buildings)
  const buildings1Front = await layer(buildingsFront)
  const shopBack = await layer(buildings2)
  const shopFront = await layer(buildings2Front)
  const rocks1Texture = await layer(rocks)
  const rocks2Texture = await layer(rocks2)
  const gateTexture = await layer(gate)
  const wellTexture = await layer(well)
  const flowerRedTexture = await layer(flowerRed)
  const flowerWhiteTexture = await layer(flowerWhite)
  world.addChild(groundTexture)
  world.addChild(roadTexture)
  world.addChild(flowerWhiteTexture)
  world.addChild(flowerRedTexture)
  world.addChild(waterTexture)
  world.addChild(rocks1Texture)
  world.addChild(rocks2Texture)
  world.addChild(greeneryFirst)
  world.addChild(greenerySecond)
  world.addChild(greeneryThird)
  world.addChild(greeneryFourth)
  greeneryMiscTexture.zIndex = 9999
  world.addChild(greeneryMiscTexture)
  world.addChild(buildings1Front)
  world.addChild(shopBack)
  world.addChild(shopFront)
  propsTexture.zIndex = 9
  world.addChild(propsTexture)
  propsBehindTexture.zIndex = 9
  world.addChild(propsBehindTexture)
  gateTexture.zIndex = 8
  world.addChild(gateTexture)
  world.addChild(wellTexture)
  buildings1Back.zIndex = 9
  world.addChild(buildings1Back)


  await Assets.load(CharacterWalk)
  const walkLeft = await createSprite(dataWalkLeft)
  const walkRight = await createSprite(dataWalkRight)
  const walkDown = await createSprite(dataWalkDown)
  const walkUp = await createSprite(dataWalkUp)

  // app.stage.addChild(aWalkDown)
  // aWalkDown.animationSpeed = 0.1
  // aWalkDown.play()
  //app.stage.addChild(currentSprite)
  currentSprite = walkLeft
  currentSprite.anchor.set(0.5);
  currentSprite.x = 859;
  currentSprite.y = 1200;
  currentSprite.zIndex = 7

  world.addChild(currentSprite)

  const switchSprite = (newSprite: PIXI.AnimatedSprite) => {
    if (newSprite !== currentSprite) {
      newSprite.x = currentSprite.x;
      newSprite.y = currentSprite.y;
      newSprite.anchor.set(0.5);

      world.removeChild(currentSprite);
      currentSprite = newSprite
      world.addChild(currentSprite)

      currentSprite.animationSpeed = 0.13
    }

  }

  const entity = new PIXI.Sprite(PIXI.Texture.WHITE)
  entity.anchor.set(0.5, 0.5)
  entity.width = 10
  entity.height = 20
  entity.x = 488
  entity.y = 672
  entity.tint = 8189007

  world.addChild(entity)

  data.entities.Ichaicha.flatMap(item => {
    console.log(item);
  })


  window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
    currentSprite.stop();
  })

  window.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    event.preventDefault();
  })

  app.ticker.add(() => {
    newSprite = currentSprite;
    let nextX = currentSprite.x;
    let nextY = currentSprite.y;

    const playerCollision = currentSprite.getBounds()
    const entity1Collision = entity.getBounds()
    if (
      playerCollision.x < entity1Collision.x + entity1Collision.width &&
      playerCollision.x + playerCollision.width > entity1Collision.x &&
      playerCollision.y < entity1Collision.y + entity1Collision.height &&
      playerCollision.y + playerCollision.height > entity1Collision.y
    ) {
      console.log("Hit Entity 1");
    }


    if (keys['ArrowUp'] && canMove(nextX, nextY - speed)) {
      nextY -= speed
      newSprite = walkUp
      currentSprite.y -= speed
      currentSprite.play()

    }

    if (keys['ArrowDown'] && canMove(nextX, nextY + speed)) {
      nextY += speed
      newSprite = walkDown
      currentSprite.y += speed
      currentSprite.play()
    }

    if (keys['ArrowLeft'] && canMove(nextX - speed, nextY)) {
      nextX -= speed
      newSprite = walkLeft
      currentSprite.x -= speed
      currentSprite.play()
    }

    if (keys['ArrowRight'] && canMove(nextX + speed, nextY)) {
      nextX += speed
      newSprite = walkRight
      currentSprite.x += speed
      currentSprite.play()
    }

    switchSprite(newSprite);

    world.x = -currentSprite.x + app.screen.width * 0.34;
    world.y = -currentSprite.y + app.screen.height * 0.34;
  })
}

const loadCollisionData = async () => {
  const response = await fetch("/Collision.csv")
  const text = await response.text();
  const parsed = text
    .trim()
    .split("\n")
    .map(row => row.split(",").map(cell => {
      const num = Number(cell);
      if (isNaN(num)) console.error("Invalid number found:", cell);
      return num;
    }));

  console.log("Parsed Collision Map:", parsed);
  collisionMap.value = parsed;
  console.log("map", collisionMap);
}

const canMove = (x: number, y: number) => {
  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);

  if (tileY < 0 || tileY >= collisionMap.value.length ||
    tileX < 0 || tileX >= collisionMap.value[0].length
  ) {
    return false
  }
  return collisionMap.value[tileY][tileX] === 0;
}

// const goBack = () => {
//   router.back();
// }


</script>

<style lang="scss" scoped>
.game {
  transform: scale(1.1);
}
</style>
