import { GameObject } from 'rpgbaker'
import ObjectCollisions from './object_collisions'
const PIXI = require('pixi.js')

export default class ObjectGame extends GameObject {
  Init () {
    super.Init()
    this.persistent = true
    this.debugMode = false

    this.guiWidth = this.myParent.game.app.renderer.width
    this.guiHeight = this.myParent.game.app.renderer.height
    console.log(this.guiWidth)
    console.log(this.guiHeight)

    this.graphicsHitArea = new PIXI.Graphics()
    this.graphicsHitArea.beginFill(0xffff00)
    this.graphicsHitArea.lineStyle(5, 0xffff00)

    this.graphicsHitArea.drawRect(0, 0, this.guiWidth / 2, this.guiHeight / 2)

    this.addChild(this.graphicsHitArea)
    this.graphicsHitArea.alpha = 0.5
  }

  Update (delta) {
    super.Update(delta)

    if (this.myParent.game.input.IsKeyPressed(this.myParent.game.input.vk_d)) {
      console.log('Toggle Debug Mode')
      this.debugMode = !this.debugMode
      let newAlpha = this.debugMode
      this.With(ObjectCollisions, obj => {
        console.log(obj.name)
        obj.graphicsHitArea.alpha = newAlpha
      })
    }
  }
}
