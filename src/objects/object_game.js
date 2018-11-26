import { GameObject } from 'rpgbaker'
import ObjectCollisions from './object_collisions'
const PIXI = require('pixi.js')

export default class ObjectGame extends GameObject {
  Init () {
    console.log('ObjectGame Init')

    this.persistent = true
    this.debugMode = false

    this.guiWidth = this.room.game.app.renderer.width
    this.guiHeight = this.room.game.app.renderer.height
    console.log(this.guiWidth)
    console.log(this.guiHeight)

    this.fullScreenQuad = new PIXI.Graphics()
    this.fullScreenQuad.beginFill(0x000000)
    this.fullScreenQuad.lineStyle(10, 0xffff00)

    this.fullScreenQuad.drawRect(0, 0, this.guiWidth, this.guiHeight)

    this.addChild(this.fullScreenQuad)
    this.fullScreenQuad.alpha = 0
    this.fullScreenQuad.parentGroup = this.room.game.groups.get('2')

    this.spawnRoom = -1
    this.doTransition = false

    this.cellSize = 32

    super.Init()
  }

  Destroy () {
    console.log('ObjectGame Destroy')
    this.removeChild(this.fullScreenQuad)
    this.removeChild(this.grid)
  }
  Update (delta) {
    if (this.room.game.input.IsKeyPressed(this.room.game.input.vk_d)) {
      console.log('Toggle Debug Mode')
      this.debugMode = !this.debugMode
      let newAlpha = this.debugMode
      this.With(ObjectCollisions, obj => {
        console.log(obj.name)
        obj.graphicsHitArea.alpha = newAlpha
      })

      this.grid.alpha = newAlpha
    }

    this.fullScreenQuad.x = -this.room.game.app.stage.position.x
    this.fullScreenQuad.y = -this.room.game.app.stage.position.y

    if (this.doTransition) {
      console.log('do transition')
      if (this.room.game.currentRoomKey !== this.spawnRoom) {
        this.fullScreenQuad.alpha += 0.01
        if (this.fullScreenQuad.alpha >= 1.0) {
          this.room.game.RoomGoto(this.spawnRoom)
        }
      } else {
        this.fullScreenQuad.alpha -= 0.01
        if (this.fullScreenQuad <= 0) {
          this.doTransition = false
        }
      }
    }
    super.Update(delta)
  }

  OnRoomStart () {
    console.log('OnRoomStart')

    this.roomWidth = this.room.game.GetCurrentRoomWidth()
    this.roomHeight = this.room.game.GetCurrentRoomHeight()

    console.log('GetCurrentRoom ' + this.roomWidth + ' ' + this.roomHeight)

    if (this.grid) {
      this.removeChild(this.grid)
    }

    this.grid = new PIXI.Graphics()
    this.grid.lineStyle(1, 0x00ffee, 0.5)

    let spaceWidth = Math.floor(this.roomWidth / this.cellSize)
    for (let i = 0; i < spaceWidth; i++) {
      this.grid.moveTo(i * this.cellSize, 0)
      this.grid.lineTo(i * this.cellSize, this.roomHeight)
    }

    let spaceHeight = Math.floor(this.roomHeight / this.cellSize)
    for (let j = 0; j < spaceHeight; j++) {
      this.grid.moveTo(0, j * this.cellSize)
      this.grid.lineTo(this.roomWidth, j * this.cellSize)
    }

    this.grid.alpha = 0
    this.addChild(this.grid)

    this.grid.parentGroup = this.room.game.groups.get('2')
  }
}
