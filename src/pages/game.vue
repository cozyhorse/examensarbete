<template>
  <div class="container">
    <div class="game-wrapper">
      <v-card class="custom-card" elevation="5" width="1300" height="700">
        <div class="game" ref="gameContainer"></div>
      </v-card>
        <v-btn class="custom-btn" @click="goBack">Back</v-btn>

      </div>
      <Workdialog class="ma-4" title="Work" year="2024 - 2025" description="Worked like a horse"></Workdialog>
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
import Workdialog from '@/components/Workdialog.vue';
import { entitySetter } from '@/Util/WorkEntitySetter';

const gameContainer = ref<HTMLElement | null>(null)
const keys: Record<string, boolean> = {};
let currentSprite: PIXI.AnimatedSprite;
let newSprite: PIXI.AnimatedSprite;
const speed: number = 3.5;
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
    //width: data.width / 2,
    //height: data.height / 2,
    resizeTo: window,
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
  greenerySecond.zIndex = 8
  world.addChild(greenerySecond)
  world.addChild(greeneryThird)
  world.addChild(greeneryFourth)
  greeneryMiscTexture.zIndex = 6
  world.addChild(greeneryMiscTexture)
  world.addChild(buildings1Front)
  world.addChild(shopBack)
  world.addChild(shopFront)
  propsTexture.zIndex = 9
  world.addChild(propsTexture)
  propsBehindTexture.zIndex = 6
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
  currentSprite.anchor.set(1);
  currentSprite.x = 1550;
  currentSprite.y = 1200;
  currentSprite.zIndex = 7
  world.addChild(currentSprite)
  console.log("sprite",currentSprite.width);

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

  // const entity = new PIXI.Sprite(PIXI.Texture.WHITE)
  // entity.anchor.set(0.5, 0.5)
  // entity.width = 16
  // entity.height = 16
  // entity.x = 1744
  // entity.y = 720
  // entity.tint = 1113042
  // entity.zIndex = 9
  // world.addChild(entity)

  const scandicEntity = entitySetter(data, "Scandic", world)
  const ichaEntity = entitySetter(data, "Ichaicha", world)
  const skovdeEntity = entitySetter(data, "Skovdekommun", world)
  const majorenEntity = entitySetter(data, "Majoren", world)
  const elgigantenEntity = entitySetter(data, "ElGiganten", world)

  const entities = {
    scandicEntity,
    ichaEntity,
    skovdeEntity,
    majorenEntity,
    elgigantenEntity
  }


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
    newSprite.zIndex = 7
    let nextX = currentSprite.x;
    let nextY = currentSprite.y;

    for(const entityKey of Object.keys(entities)){
      const entity = entities[entityKey]
      if(entity){
        const playerCollision = currentSprite.getBounds()
        const entityCollision = entity.getBounds()

        if (
          playerCollision.x < entityCollision.x + entityCollision.width &&
          playerCollision.x + playerCollision.width > entityCollision.x &&
          playerCollision.y < entityCollision.y + entityCollision.height &&
          playerCollision.y + playerCollision.height > entityCollision.y
        ) {
          console.log("Hit Entity", entityKey);
        }
      }

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

    world.x = -currentSprite.x + app.screen.width * 0.4;
    world.y = -currentSprite.y + app.screen.height * 0.3;
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
  const playerWidth = currentSprite.width;   // Get player width
  const playerHeight = currentSprite.height; // Get player height

  // Check all four corners
  const corners = [
    { x: x - playerWidth / 2, y: y - playerHeight / 2 }, // Top-left
    { x: x + playerWidth / 2, y: y - playerHeight / 2 }, // Top-right
    { x: x - playerWidth / 2, y: y + playerHeight / 2 }, // Bottom-left
    { x: x + playerWidth / 2, y: y + playerHeight / 2 }  // Bottom-right
  ];

  return corners.every(corner => {
    const tileX = Math.floor(corner.x / tileSize);
    const tileY = Math.floor(corner.y / tileSize);

    if (
      tileY < 0 || tileY >= collisionMap.value.length ||
      tileX < 0 || tileX >= collisionMap.value[0].length
    ) {
      return false; // Out of bounds
    }

    return collisionMap.value[tileY][tileX] === 0;
  });
};

const goBack = () => {
  router.back();
}

</script>

<style lang="scss" scoped>

// .container{
//   position: absolute;
// }

.custom-btn{
  position: relative;
  top: -50px;
  left: 150px;
}



.game-wrapper {
  //width: 1600px;  // Set desired width
  height: 710px; // Set desired height
  overflow: hidden;
  position: relative;
}

.custom-card{
  margin: auto;
  overflow: hidden;
}

.game {
  width: 100%;
  height: 100%;
  transform: scale(1);
}
</style>
