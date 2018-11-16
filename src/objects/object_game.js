import { GameObject } from 'rpgbaker'
const PIXI = require('pixi.js')

export default class ObjectGame extends GameObject {
  Init () {
    this.persistent = true
    this.debugMode = false
  }

  Update (delta) {
    if (this.myParent.game.input.IsKeyPressed(this.myParent.game.input.vk_d)) {
      console.log('Toggle Debug Mode')
      this.debugMode = !this.debugMode
    }
  }
}
