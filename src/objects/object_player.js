import ObjectCollisions from './object_collisions'
import { GameObject, Utils } from 'rpgbaker'

const PIXI = require('pixi.js')
const femaleBody = require('../assets/female-body.png')

export default class ObjectPlayer extends GameObject {
  Init () {
    this.animSpeed = 6
    this.animLength = 9
    this.xFrame = 1
    this.yFrame = 11
    this.textureBody = PIXI.loader.resources[femaleBody].texture

    this.femaleBody = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureBody,
        this.xFrame * 64,
        this.yFrame * 64,
        64,
        64
      )
    )
    this.femaleBody.parentGroup = this.parent.game.groups.get('1')

    // this.femaleBody.anchor.set(0.5)

    this.addChild(this.femaleBody)

    let tempHitArea = new PIXI.Rectangle(17, 54, 30, 10)
    this.hitArea = tempHitArea

    let toto = this.hitArea
    var graphics = new PIXI.Graphics()
    // graphics.beginFill(0xffff00)
    // set the line style to have a width of 5 and set the color to red
    graphics.lineStyle(1, 0xffff00)
    // draw a rectangle
    graphics.drawRect(toto.x, toto.y, toto.width, toto.height)
    graphics.parentGroup = this.parent.game.groups.get('1')

    this.addChild(graphics)

    // this.graphics = new PIXI.Graphics()
    // this.graphics.beginFill(0xff7070, 1)
    // this.graphics.drawRect(0, 0, this.jsonObject.width, this.jsonObject.height)
    // this.graphics.endFill()

    // this.addChild(this.graphics)

    this.moveX = 0
    this.moveY = 0
    this.speed = 4
  }

  Update (delta) {
    // console.log(this.x)
    // console.log(this.y)

    this.moveX = 0
    this.moveY = 0

    if (this.parent.game.input.IsKeyDown(this.parent.game.input.vk_left)) {
      this.moveX -= this.speed
    }
    if (this.parent.game.input.IsKeyDown(this.parent.game.input.vk_right)) {
      this.moveX += this.speed
    }
    if (this.parent.game.input.IsKeyDown(this.parent.game.input.vk_down)) {
      this.moveY += this.speed
    }
    if (this.parent.game.input.IsKeyDown(this.parent.game.input.vk_up)) {
      this.moveY -= this.speed
    }

    if (this.moveX) {
      if (this.PlaceMeeting(this.x + this.moveX, this.y, ObjectCollisions)) {
        console.log('!!!! YESSSS')
        for (let i = 0; i < Math.abs(this.moveX); i++) {
          if (
            this.PlaceMeeting(
              this.x + Math.sign(this.moveX),
              this.y,
              ObjectCollisions
            ) === false
          ) {
            this.x += Math.sign(this.moveX)
          }
        }
        this.moveX = 0
      }
    }

    if (this.moveY) {
      if (this.PlaceMeeting(this.x, this.y + this.moveY, ObjectCollisions)) {
        for (let i = 0; i < Math.abs(this.moveY); i++) {
          if (
            this.PlaceMeeting(
              this.x,
              this.y + Math.sign(this.moveY),
              ObjectCollisions
            ) === false
          ) {
            this.y += Math.sign(this.moveY)
          }
        }
        this.moveY = 0
      }
    }

    // Apply movement
    this.x += this.moveX
    this.y += this.moveY

    // Update texture animation

    if (this.xFrame < this.animLength - this.animSpeed / 60) {
      this.xFrame = this.xFrame + this.animSpeed / 60
    } else {
      this.xFrame = 1
    }

    if (this.moveX < 0) this.yFrame = 9
    else if (this.moveX > 0) this.yFrame = 11
    else if (this.moveY < 0) this.yFrame = 8
    else if (this.moveY > 0) this.yFrame = 10
    else this.xFrame = 0

    this.femaleBody.texture = Utils.GetTexturePart(
      this.textureBody,
      Math.floor(this.xFrame) * 64,
      this.yFrame * 64,
      64,
      64
    )
  }
}
