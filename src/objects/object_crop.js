import { GameObject, Utils } from 'rpgbaker'
const PIXI = require('pixi.js')

const crops = require('../assets/spr_crops.png')
export default class ObjectCrop extends GameObject {
  constructor () {
    super()
    this.frameWidth = 32
    this.frameHeight = 64

    this.cropType = 0 // Tomato
    this.daysOld = 0
    this.growthStage = 0
    this.growthStageDuration = 0
    this.maxGrowthStage = 5 // TODO should not be hardcoded

    this.fullyGrown = false
    this.sparkle = false
  }
  Init () {
    super.Init()

    this.textureCrops = PIXI.loader.resources[crops].texture

    this.crops = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureCrops,
        this.growthStage * this.frameWidth,
        this.cropType * this.frameHeight,
        32,
        64
      )
    )

    this.addChild(this.crops)
  }

  SetPosition (x, y) {
    this.x = x - this.width / 2 + 2
    this.y = y - this.height + 6
  }
}
