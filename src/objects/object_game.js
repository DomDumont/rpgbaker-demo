import { GameObject } from 'rpgbaker'
import ObjectCollisions from './object_collisions'
const PIXI = require('pixi.js')

export default class ObjectGame extends GameObject {
  Init () {
    super.Init()
    this.persistent = true
    this.debugMode = false
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
