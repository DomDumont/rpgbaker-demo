import { GameObject } from 'rpgbaker'
import ObjectCollisions from './object_collisions'
const PIXI = require('pixi.js')

export default class ObjectGame extends GameObject {
  Init () {
    console.log('ObjectGame Init')

    this.persistent = true
    this.debugMode = false

    this.guiWidth = this.myParent.game.app.renderer.width
    this.guiHeight = this.myParent.game.app.renderer.height
    console.log(this.guiWidth)
    console.log(this.guiHeight)

    this.fullScreenQuad = new PIXI.Graphics()
    this.fullScreenQuad.beginFill(0xffff00)
    this.fullScreenQuad.lineStyle(5, 0xffff00)

    this.fullScreenQuad.drawRect(0, 0, this.guiWidth, this.guiHeight)

    this.addChild(this.fullScreenQuad)
    this.fullScreenQuad.alpha = 0.5
    this.fullScreenQuad.parentGroup = this.myParent.game.groups.get('2')
    super.Init()
  }

  Destroy () {
    console.log('ObjectGame Destroy')
    this.removeChild(this.fullScreenQuad)
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

    this.fullScreenQuad.x = -this.myParent.game.app.stage.position.x
    this.fullScreenQuad.y = -this.myParent.game.app.stage.position.y
  }
}
