<template>
  <div class="container">
    <div class="game-wrapper">
      <v-card
        class="custom-card"
        elevation="5"
      >
        <div
          ref="gameContainer"
          class="game"
        />
        <v-card
          v-if="showQuestLog"
          width="300"
          color="grey-darken-1"
          class="pa-3 quest-log"
        >
          <v-col class="">
            <v-row>
              <h3>Quest log </h3><v-img inline :src="book" height="25" width="25" />
            </v-row>
            <v-row>
              <p>Visit all my workplaces <v-img inline :src="list" height="25" width="25" /> </p>
            </v-row>
          </v-col>
          <v-divider class="ma-1" />
          <v-col
            v-for="[name, value] in Object.entries(entityHitData)"
            :key="name"
          >
            <v-row>
              <img v-if="value" class="mr-2" :src="yellowstar" /> <p>{{ name }}</p>
            </v-row>
          </v-col>
        </v-card>
        <Transition>
          <Workdialog
            v-if="showDialog"
            class="ma-4 workdialog"
            :work="currentDialogData?.workPlace || 'work'"
            :title="currentDialogData?.title || 'Work'"
            :year="currentDialogData?.year || '2024 - 2025'"
            :description="currentDialogData?.description || 'Worked like a horse'"
          />
        </Transition>
        <v-btn
          class="custom-btn"
          @click="goBack"
        />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PIXI } from '@/pixi';
import CharacterWalk from '@/assets/spritesheet/CharacterWalk.png'
import CharacterIdle from '@/assets/spritesheet/CharacterIdle.png'
import CampFire from "@/assets/spritesheet/Campfire.png"
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
  wellFront,
} from '@/imports/Levels';
import { data } from '@/imports/LevelData';
import { Assets } from 'pixi.js';
import router from '@/router';
import Workdialog from '@/components/Workdialog.vue';
import { entitySetter } from '@/Util/WorkEntitySetter';
import { dataIdleDown, dataIdleLeft, dataIdleRight, dataIdleUp } from '@/animation/CharacterIdle';
import { loadCollisionData } from '@/Util/LoadCollision';
import { canMove } from '@/Util/CanMove';
import { dataFire } from '@/animation/Fire';
import yellowstar from '@/assets/starYellow.png'
import book from '@/assets/book.png'
import list from '@/assets/list.png'

const gameContainer = ref<HTMLElement | null>(null)
const keys: Record<string, boolean> = {};
let currentSprite: PIXI.AnimatedSprite;
let newSprite: PIXI.AnimatedSprite;
const speed: number = 2.5;
const collisionMap = ref<number[][]>([]);
const tileSize: number = 16;
const showDialog = ref(false)
const currentDialogData = ref<{workPlace:string, title:string; year: string; description: string;} | null>(null)
const dataEntities = data.entities;
let lastDirection: string = "down";
const showQuestLog = ref(false);

const entityHitData =  ref<Record<string, boolean | null>>({
  scandic: false,
  ichaicha: false,
  skovdekommun: false,
  majoren: false,
  elgiganten: false,
})

onMounted(async () => {
  collisionMap.value = await loadCollisionData();
  await nextTick();
  await initGame();
  showQuestLog.value = true;
})
const initGame = async () => {
  if (!gameContainer.value) {
    console.log("No gamecontainer");
    return
  }

  const app = new PIXI.Application();
  await app.init({
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
  const wellFrontTexture = await layer(wellFront)

  world.addChild(groundTexture);
  world.addChild(roadTexture);
  world.addChild(flowerWhiteTexture);
  world.addChild(flowerRedTexture);
  world.addChild(waterTexture);
  world.addChild(rocks1Texture);
  world.addChild(rocks2Texture);
  greeneryFirst.zIndex = 8;
  world.addChild(greeneryFirst);
  greenerySecond.zIndex = 8;
  world.addChild(greenerySecond);
  world.addChild(greeneryThird);
  greeneryFourth.zIndex = 8;
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
  wellFrontTexture.zIndex = 9
  world.addChild(wellFrontTexture)
  world.addChild(wellTexture)
  buildings1Back.zIndex = 9
  world.addChild(buildings1Back)


  await Assets.load(CampFire)
  const fireIdle1 = await createSprite(dataFire)
  fireIdle1.x = 1360
  fireIdle1.y = 1021
  fireIdle1.scale = 0.4
  fireIdle1.zIndex = 6
  fireIdle1.animationSpeed = 0.1
  fireIdle1.play()
  world.addChild(fireIdle1)

  await Assets.load(CharacterIdle)
  await Assets.load(CharacterWalk)
  const idleLeft = await createSprite(dataIdleLeft)
  const idleRight = await createSprite(dataIdleRight)
  const idleUp = await createSprite(dataIdleUp)
  const idledown = await createSprite(dataIdleDown)

  const walkLeft = await createSprite(dataWalkLeft)
  const walkRight = await createSprite(dataWalkRight)
  const walkDown = await createSprite(dataWalkDown)
  const walkUp = await createSprite(dataWalkUp)

  currentSprite = idleLeft
  currentSprite.anchor.set(0.5);
  currentSprite.x = 1545;
  currentSprite.y = 1200;
  currentSprite.zIndex = 7
  currentSprite.animationSpeed = 0.13
  currentSprite.play();

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

  const scandic = entitySetter(data, "scandic", world)
  const ichaicha = entitySetter(data, "ichaicha", world)
  const skovdekommun = entitySetter(data, "skovdekommun", world)
  const majoren = entitySetter(data, "majoren", world)
  const elgiganten = entitySetter(data, "elgiganten", world)
  const construction = entitySetter(data, "construction", world)
  const construction2 = entitySetter(data, "construction2", world)

  const entities: Record<string, PIXI.Sprite | null> = {
    scandic,
    ichaicha,
    skovdekommun,
    majoren,
    elgiganten,
    construction,
    construction2,
  }



  window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
    currentSprite.stop();

    switch(lastDirection){
      case "up":
        switchSprite(idleUp)
        break;
      case "down":
        switchSprite(idledown)
        break;
      case "left":
        switchSprite(idleLeft)
        break;
      case "right":
        switchSprite(idleRight)
        break;
    }
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
    let collisionChecker: boolean = false

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
          collisionChecker = true;
          showDialog.value = true;

          const entityData = (dataEntities as any)[entityKey]
            currentDialogData.value = {
              workPlace: entityData[0].customFields.workPlace,
              title: entityData[0].customFields.workTitle,
              year: entityData[0].customFields.workYear,
              description: entityData[0].customFields.workDescription
            }

            entityHitData.value[entityKey] = true
          //console.log("Hit Entity", entityKey);
          break;
        }
      }

    }

    if(!collisionChecker){
      showDialog.value = false;
      currentDialogData.value = null
    }


    if (keys['ArrowUp'] && canMove(nextX, nextY - speed, currentSprite, collisionMap, tileSize)) {
      nextY -= speed
      newSprite = walkUp
      lastDirection = "up"
      currentSprite.y -= speed
      currentSprite.play()

    }

    if (keys['ArrowDown'] && canMove(nextX, nextY + speed, currentSprite, collisionMap, tileSize)) {
      nextY += speed
      newSprite = walkDown
      lastDirection = "down"
      currentSprite.y += speed
      currentSprite.play()
    }

    if (keys['ArrowLeft'] && canMove(nextX - speed, nextY, currentSprite, collisionMap, tileSize)) {
      nextX -= speed
      newSprite = walkLeft
      lastDirection = "left"
      currentSprite.x -= speed
      currentSprite.play()
    }

    if (keys['ArrowRight'] && canMove(nextX + speed, nextY, currentSprite, collisionMap, tileSize)) {
      nextX += speed
      newSprite = walkRight
      lastDirection = "right"
      currentSprite.x += speed
      currentSprite.play()
    }

    switchSprite(newSprite);

    world.x = -currentSprite.x + app.screen.width * 0.4;
    world.y = -currentSprite.y + app.screen.height * 0.4;
  })
}

const goBack = () => {
  router.back();
}

</script>

<style lang="scss" scoped>

.custom-btn{
  position: relative;
  // top: -50px;
  // left: 110px;
  margin-top: -123px;
  margin-left: 50px;
  background: none;
  background-image: url("/src/assets/back.gif");
  background-position: center center;
  background-size: 70px;
  background-repeat: no-repeat;
}
.quest-log{
  margin-top: -800px;
  margin-right: 50px;
  float: right;
  opacity: 0.9;

  @media (max-width: 1350px) {
    max-width: 80%;
    padding: 10px;
    margin-top: -600px;
    margin-right: 50px;
    scale: 0.75;
  }

  @media (max-width: 600px) {
    max-width: 90%;
    scale: 0.6;
    padding: 8px;
  }

  img{
    height: 20px;
    width: 20px;
  }
}
::v-deep(.v-btn--variant-elevated){
  box-shadow: none;
}

.game-wrapper {
  height: 86vh;
  width: 86vw;
  overflow: hidden;
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-card {
  width: 100%;
  height: 100%;
  max-width: 1650px;
  max-height: 900px;
  aspect-ratio: 16 / 9;
  margin: auto;
  overflow: hidden;
}

.game {
  width: 100%;
  height: 100%;
  transform: scale(1.3);
}

.workdialog{
  position: relative;
  top: -540px;
  left: 0px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
