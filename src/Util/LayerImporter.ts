import { PIXI } from "@/pixi"
import { data } from "@/imports/LevelData"

const layer = async (layer: any)=> {
  await PIXI.Assets.load(layer)
  const mapTexture = PIXI.Sprite.from(layer)
  const map = new PIXI.Sprite(mapTexture)
  map.width = data.width
  map.height = data.height
  return map
}

export default layer
