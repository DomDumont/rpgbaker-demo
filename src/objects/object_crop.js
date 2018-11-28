import { GameObject, Utils } from 'rpgbaker'
const PIXI = require('pixi.js')

const crops = require('../assets/spr_crops.png')
const sparkles = require('../assets/spr_sparkle_strip5.png')
export default class ObjectCrop extends GameObject {
  constructor () {
    super()
    this.frameWidth = 32
    this.frameHeight = 64

    this.cropType = 0 // Tomato
    this.daysOld = 0
    this.growthStage = 0
    this.growthStageDuration = 0
    this.maxGrowthStage = 4 // TODO should not be hardcoded

    this.fullyGrown = false
    this.sparkleIndex = -1
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

    this.textureSparkle = PIXI.loader.resources[sparkles].texture

    this.sparkles = new PIXI.Sprite(
      Utils.GetTexturePart(this.textureSparkle, 0, 0, 16, 16)
    )

    this.sparkles.alpha = 0
    this.sparkles.x = 18
    this.sparkles.y = 10

    this.addChild(this.sparkles)
  }

  AddOneDay () {
    this.daysOld++
    this.growthStage = Math.floor(this.daysOld / this.growthStageDuration)
    if (this.growthStage >= this.maxGrowthStage) {
      this.growthStage = this.maxGrowthStage
      this.fullyGrown = true
      this.SetAlarm(1, 1) // For the sparkles
    }

    console.log('this.growthStage ' + this.growthStage)
    this.crops.texture = Utils.GetTexturePart(
      this.textureCrops,
      this.growthStage * this.frameWidth,
      this.cropType * this.frameHeight,
      32,
      64
    )
  }
  SetPosition (x, y) {
    this.x = x - this.crops.width / 2 + 2
    this.y = y - this.crops.height + 6
  }

  OnAlarm (alarmIndex) {
    this.sparkleIndex = 0
  }

  Update (delta) {
    super.Update(delta)

    if (this.sparkleIndex >= 0) {
      this.sparkles.texture = Utils.GetTexturePart(
        this.textureSparkle,
        Math.floor(this.sparkleIndex) * 16,
        0,
        16,
        16
      )

      this.sparkles.alpha = 1

      this.sparkleIndex += 0.1
      // TODO Should not be hardcoded
      if (this.sparkleIndex > 4) {
        this.sparkleIndex = -1
        this.sparkles.alpha = 0
        this.SetAlarm(1, Utils.GetRandomFloat(4, 5) * 60) // TODO change the 60 to ticker.FPS
      }
    }
  }
}
