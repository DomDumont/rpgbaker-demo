import ObjectCollisions from './object_collisions'
import ObjectGame from './object_game'
import ObjectTransitions from './object_transitions'
import { Utils, Input } from 'rpgbaker'

const PIXI = require('pixi.js')
const femaleBody = require('../assets/female-body.png')
const femaleDress = require('../assets/tightdress_red.png')
const femaleHair = require('../assets/blonde2.png')
const shadow = require('../assets/shadow.png')

export default class ObjectPlayer extends ObjectCollisions {
  Init () {
    super.Init()

    this.animSpeed = 15
    this.animLength = 9
    this.xFrame = 1
    this.yFrame = 11
    this.textureBody = PIXI.loader.resources[femaleBody].texture
    this.textureDress = PIXI.loader.resources[femaleDress].texture
    this.textureHair = PIXI.loader.resources[femaleHair].texture
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

    this.addChild(this.femaleHair)

    this.SetHitArea(new PIXI.Rectangle(17, 54, 30, 10))

    this.moveX = 0
    this.moveY = 0
    this.speed = 4
  }

  Update (delta) {
    super.Update(delta)

    this.moveX = 0
    this.moveY = 0

    if (this.room.game.input.IsKeyDown(Input.Keycodes.LEFT)) {
      this.moveX -= this.speed
    }
    if (this.room.game.input.IsKeyDown(Input.Keycodes.RIGHT)) {
      this.moveX += this.speed
    }
    if (this.room.game.input.IsKeyDown(Input.Keycodes.DOWN)) {
      this.moveY += this.speed
    }
    if (this.room.game.input.IsKeyDown(Input.Keycodes.UP)) {
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

    // Check transitions

    let inst = this.InstancePlace(
      this.x,
      this.y + this.moveY,
      ObjectTransitions
    )

    if (inst) {
      this.With(ObjectGame, obj => {
        console.log(obj.name)
        obj.spawnRoom = inst.targetRoom
        obj.doTransition = true
      })
    }

    // Apply movement

    // this.x += this.moveX
    // this.y += this.moveY

    this.OffsetPosition(this.moveX, this.moveY)

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
