import { GameObject } from 'rpgbaker'
const PIXI = require('pixi.js')

export default class ObjectCollisions extends GameObject {
  Init () {
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0xff700b, 1)
    this.graphics.drawRect(0, 0, this.jsonObject.width, this.jsonObject.height)
    this.graphics.endFill()
    // this.graphics.parentGroup = this.parent.game.groups.get('1')
    this.graphics.alpha = 0.25
    this.addChild(this.graphics)
  }
}
