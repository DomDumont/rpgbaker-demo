import ObjectCollisions from './object_collisions'
import { GameObject, Utils } from 'rpgbaker'

const PIXI = require('pixi.js')
const maleBody = require('../assets/male-body.png')
const maleDress = require('../assets/teal_longsleeve.png')
const maleHair = require('../assets/mohawk.png')
const shadow = require('../assets/shadow.png')

export default class ObjectNPC extends GameObject {
  Init () {
    this.animSpeed = 15
    this.animLength = 9
    this.xFrame = 1
    this.yFrame = 11
    this.textureBody = PIXI.loader.resources[maleBody].texture
    this.textureDress = PIXI.loader.resources[maleDress].texture
    this.textureHair = PIXI.loader.resources[maleHair].texture
    this.textureShadow = PIXI.loader.resources[shadow].texture

    this.shadow = new PIXI.Sprite(this.textureShadow)
    this.addChild(this.shadow)

    this.femaleBody = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureBody,
        this.xFrame * 64,
        this.yFrame * 64,
        64,
        64
      )
    )
    // this.femaleBody.parentGroup = this.parent.game.groups.get('1')
    this.addChild(this.femaleBody)

    this.femaleDress = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureDress,
        this.xFrame * 64,
        this.yFrame * 64,
        64,
        64
      )
    )
    // this.femaleDress.parentGroup = this.parent.game.groups.get('1')
    this.addChild(this.femaleDress)

    this.femaleHair = new PIXI.Sprite(
      Utils.GetTexturePart(
        this.textureHair,
        this.xFrame * 64,
        this.yFrame * 64,
        64,
        64
      )
    )
    // this.femaleHair.parentGroup = this.parent.game.groups.get('1')
    this.addChild(this.femaleHair)

    let tempHitArea = new PIXI.Rectangle(17, 54, 30, 10)
    this.hitArea = tempHitArea

    var graphicsHitArea = new PIXI.Graphics()
    // graphics.beginFill(0xffff00)
    // set the line style to have a width of 5 and set the color to red
    graphicsHitArea.lineStyle(1, 0xffff00)
    // draw a rectangle
    graphicsHitArea.drawRect(
      this.hitArea.x,
      this.hitArea.y,
      this.hitArea.width,
      this.hitArea.height
    )
    // graphics.parentGroup = this.parent.game.groups.get('1')

    // this.addChild(graphicsHitArea)

    // this.graphics = new PIXI.Graphics()
    // this.graphics.beginFill(0xff7070, 1)
    // this.graphics.drawRect(0, 0, this.jsonObject.width, this.jsonObject.height)
    // this.graphics.endFill()

    // this.addChild(this.graphics)

    this.moveX = 0
    this.moveY = 0
    this.speed = 1

    this.SetAlarm(1, 1)
  }

  OnAlarm (alarmIndex) {
    this.moveX = 0
    this.moveY = 0

    console.log('real OnAlarm ' + alarmIndex)
    this.SetAlarm(1, Utils.GetRandomFloat(2.5, 4) * 60) // TODO change the 60 to ticker.FPS

    let idle = Utils.GetRandomBool()
    if (idle === false) {
      console.log('idle is false')
      let dir = Utils.GetRandomInt(1, 4)
      console.log('dir = ' + dir)
      switch (dir) {
        case 1:
          this.moveX = -this.speed
          break
        case 2:
          this.moveX = this.speed
          break
        case 3:
          this.moveY = -this.speed
          break
        case 4:
          this.moveY = this.speed
          break
      }
    }
  }
  Update (delta) {
    super.Update()
    // console.log(this.x)
    // console.log(this.y)

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

    this.femaleDress.texture = Utils.GetTexturePart(
      this.textureDress,
      Math.floor(this.xFrame) * 64,
      this.yFrame * 64,
      64,
      64
    )

    this.femaleHair.texture = Utils.GetTexturePart(
      this.textureHair,
      Math.floor(this.xFrame) * 64,
      this.yFrame * 64,
      64,
      64
    )
  }
}
