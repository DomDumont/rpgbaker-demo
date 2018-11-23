import { GameObject } from 'rpgbaker'
import { Utils } from 'rpgbaker'

const cropsPicked = require('../assets/spr_crops_picked_strip7.png')
export default class ObjectCrops extends GameObject {
  Init () {
    super.Init()

    // this.tomato = 0
    // this.potato = 1
    // this.carrot = 2
    // this.artichoke = 3
    // this.chilli = 4
    // this.gourd = 5
    // this.corn = 6

    this.cropsTypes = {}

    this.cropsTypes['tomato'] = { duration: 4, cost: 40 }
    this.cropsTypes['potato'] = { duration: 3, cost: 35 }
    this.cropsTypes['carrot'] = { duration: 2, cost: 25 }
    this.cropsTypes['artichoke'] = { duration: 4, cost: 45 }
    this.cropsTypes['chilli'] = { duration: 3, cost: 30 }
    this.cropsTypes['gourd'] = { duration: 2, cost: 20 }
    this.cropsTypes['corn'] = { duration: 5, cost: 50 }

    this.planting = false

    this.textureCropsPicked = PIXI.loader.resources[cropsPicked].texture

    this.cropsPicked = new PIXI.Sprite(
      Utils.GetTexturePart(this.textureCropsPicked, 0, 0, 32, 32)
    )

    this.addChild(this.cropsPicked)
    this.cropsPicked.alpha = 0

    this.selectCrop = 0
  }

  Update (delta) {
    super.Update(delta)

    if (this.room.game.input.IsKeyPressed(this.room.game.input.vk_p)) {
      console.log('Toggle Planting Mode')
      this.planting = !this.planting
      this.cropsPicked.alpha = this.planting
    }
  }

  OnMouseMove (event) {
    let mousePos = new PIXI.Point(event.data.global.x, event.data.global.y)
    let localMousePos = this.toLocal(mousePos)
    this.cropsPicked.x = localMousePos.x
    this.cropsPicked.y = localMousePos.y
  }

  OnMouseScroll (event) {
    console.log(event.wheelDelta)

    this.selectCrop = this.selectCrop + Math.sign(event.wheelDelta)
    if (this.selectCrop > 6) this.selectCrop = 0
    if (this.selectCrop < 0) this.selectCrop = 6

    this.cropsPicked.texture = Utils.GetTexturePart(
      this.textureCropsPicked,
      this.selectCrop * 32,
      0,
      32,
      32
    )
  }
}
