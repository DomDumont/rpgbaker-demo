import { GameObject, Utils, Input } from 'rpgbaker'
import ObjectCrop from '../objects/object_crop'

const PIXI = require('pixi.js')
const cropsPicked = require('../assets/spr_crops_picked_strip7.png')
export default class ObjectCrops extends GameObject {
  Init () {
    super.Init()

    this.cellSize = 32
    // this.tomato = 0
    // this.potato = 1
    // this.carrot = 2
    // this.artichoke = 3
    // this.chilli = 4
    // this.gourd = 5
    // this.corn = 6

    this.cropsTypes = {}

    this.cropsTypes[0] = { duration: 4, cost: 40 }
    this.cropsTypes[1] = { duration: 3, cost: 35 }
    this.cropsTypes[2] = { duration: 2, cost: 25 }
    this.cropsTypes[3] = { duration: 4, cost: 45 }
    this.cropsTypes[4] = { duration: 3, cost: 30 }
    this.cropsTypes[5] = { duration: 2, cost: 20 }
    this.cropsTypes[6] = { duration: 5, cost: 50 }

    this.planting = false

    this.textureCropsPicked = PIXI.loader.resources[cropsPicked].texture

    this.cropsPicked = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureCropsPicked,
        0,
        0,
        this.cellSize,
        this.cellSize
      )
    )

    this.addChild(this.cropsPicked)
    this.cropsPicked.alpha = 0

    // Draw plant advisor

    this.plantAdvisor = new PIXI.Graphics()
    this.plantAdvisor.beginFill(0xffffff)
    this.plantAdvisor.lineStyle(1, 0xffffff)

    this.plantAdvisor.drawRect(0, 0, this.cellSize, this.cellSize)

    this.room.addChild(this.plantAdvisor)
    this.plantAdvisor.alpha = 0
    this.cropsState = {}

    this.selectCrop = 0
  }

  Update (delta) {
    super.Update(delta)

    if (this.room.game.input.IsKeyPressed(Input.Keycodes.P)) {
      console.log('Toggle Planting Mode')
      this.planting = !this.planting
      this.cropsPicked.alpha = this.planting
      this.plantAdvisor.alpha = this.planting * 0.15
    }

    if (this.room.game.input.IsKeyPressed(Input.Keycodes.G)) {
      console.log('Days ++')
      this.With(ObjectCrop, obj => {
        obj.AddOneDay()
      })
    }
  }

  AddOneDay () {
    if (this.room.game.currentRoomKey === 'GameRoom') {
      console.log('Days ++')
      this.With(ObjectCrop, obj => {
        obj.AddOneDay()
      })
    } else {
      let gameObject = this.room.GetGAOByName('game')
      for (let i = 0; i < gameObject.cropsData.length; i++) {
        gameObject.cropsData[i].AddOneDay()
      }
    }
  }
  OnMouseMove (event) {
    let mousePos = new PIXI.Point(event.data.global.x, event.data.global.y)
    let localMousePos = this.toLocal(mousePos)

    let snappedX = Math.floor(localMousePos.x / this.cellSize) * this.cellSize
    let snappedY = Math.floor(localMousePos.y / this.cellSize) * this.cellSize
    this.cropsPicked.x = snappedX
    this.cropsPicked.y = snappedY

    this.plantAdvisor.x = snappedX
    this.plantAdvisor.y = snappedY

    if (
      this.room.tileMap.layers['Soil'].GetData(
        snappedX / this.cellSize,
        snappedY / this.cellSize
      )
    ) {
      if (
        this.IsPlanted(snappedX / this.cellSize, snappedY / this.cellSize) ===
        false
      ) {
        this.plantAdvisor.tint = 0x00ff00
      } else {
        this.plantAdvisor.tint = 0xff0000
      }
    } else {
      this.plantAdvisor.tint = 0xff0000
    }
  }

  OnMouseScroll (event) {
    console.log(event.wheelDelta)

    this.selectCrop = this.selectCrop + Math.sign(event.wheelDelta)
    if (this.selectCrop > 6) this.selectCrop = 0
    if (this.selectCrop < 0) this.selectCrop = 6

    this.cropsPicked.texture = Utils.GetTexturePart(
      this.textureCropsPicked,
      this.selectCrop * this.cellSize,
      0,
      this.cellSize,
      this.cellSize
    )
  }

  OnMouseClick (event) {
    if (this.planting === false) {
      return
    }

    let mousePos = new PIXI.Point(event.data.global.x, event.data.global.y)
    let localMousePos = this.toLocal(mousePos)
    console.log(
      'Plant Crop at ' + event.data.global.x + ' ' + event.data.global.y
    )

    let snappedX = Math.floor(localMousePos.x / this.cellSize) * this.cellSize
    let snappedY = Math.floor(localMousePos.y / this.cellSize) * this.cellSize

    if (
      this.room.tileMap.layers['Soil'].GetData(
        snappedX / this.cellSize,
        snappedY / this.cellSize
      )
    ) {
      console.log('Trop cool')
      if (
        this.IsPlanted(snappedX / this.cellSize, snappedY / this.cellSize) ===
        true
      ) {
        console.log('mais occupé')
        return
      }
    } else {
      return
    }

    // Let's plant

    this.Plant(snappedX / this.cellSize, snappedY / this.cellSize)

    snappedX += this.cellSize / 2
    snappedY += this.cellSize / 2

    let tempCrop = new ObjectCrop('Crop', this)
    tempCrop.cropType = this.selectCrop
    tempCrop.growthStage = 0 // Test purpose only
    tempCrop.growthStageDuration = this.cropsTypes[this.selectCrop].duration
    tempCrop.Init()
    tempCrop.SetPosition(snappedX, snappedY)
    this.room.AddGAO(tempCrop)
    this.room.addChild(tempCrop)
  }

  Plant (x, y) {
    let tempNumber = y * this.room.roomWidth + x
    this.cropsState[tempNumber] = true
  }

  IsPlanted (x, y) {
    let tempNumber = y * this.room.roomWidth + x

    if (this.cropsState[tempNumber] === true) return true
    else return false
  }

  OnRoomStart () {
    super.OnRoomStart()
    if (this.room.game.currentRoomKey === 'GameRoom') {
      console.log('Load crops data ...')

      let gameObject = this.room.GetGAOByName('game')
      if (gameObject.cropsData.length > 0) {
        console.log('COOOLLL !!!')
        for (let i = 0; i < gameObject.cropsData.length; i++) {
          let tempCrop = new ObjectCrop('Crop', this)
          tempCrop.cropType = gameObject.cropsData[i].cropType
          tempCrop.growthStage = gameObject.cropsData[i].growthStage
          tempCrop.growthStageDuration =
            gameObject.cropsData[i].growthStageDuration
          tempCrop.Init()
          tempCrop.x = gameObject.cropsData[i].x
          tempCrop.y = gameObject.cropsData[i].y

          this.room.AddGAO(tempCrop)
          this.room.addChild(tempCrop)
        }
      }
    }
  }
  OnRoomEnd () {
    super.OnRoomEnd()
    if (this.room.game.currentRoomKey === 'GameRoom') {
      console.log('Save crops data ...')
      let gameObject = this.room.GetGAOByName('game')
      this.With(ObjectCrop, obj => {
        gameObject.cropsData.push(obj)
      })
    }
  }
}
