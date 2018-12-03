import { GameObject } from 'rpgbaker'
import ObjectCrops from './object_crops'

const PIXI = require('pixi.js')
export default class ObjectDayCycle extends GameObject {
  Init () {
    super.Init()

    console.log('ObjectDayCycle Init')

    this.persistent = true

    this.seconds = 0
    this.minutes = 0
    this.hours = 0

    // 4 seasons of 30 days each

    this.day = 1
    this.season = 1
    this.year = 1

    this.nbGameSecondsPerTick = 100

    this.darkness = 0

    this.lightColor = 0x000000

    this.guiWidth = this.room.game.app.renderer.width
    this.guiHeight = this.room.game.app.renderer.height

    this.fullScreenQuad = new PIXI.Graphics()
    this.fullScreenQuad.beginFill(this.lightColor)
    this.fullScreenQuad.lineStyle(4, 0x0000ff)

    this.fullScreenQuad.drawRect(0, 0, this.guiWidth, this.guiHeight)

    this.room.game.UI.addChild(this.fullScreenQuad)
    this.fullScreenQuad.alpha = this.darkness

    this.basicText = new PIXI.Text('Basic text in pixi')
    this.basicText.style.fill = 0xffff00
    this.basicText.x = 30
    this.basicText.y = 90

    this.room.game.UI.addChild(this.basicText)
  }

  Update (delta) {
    super.Update(delta)

    this.seconds += this.nbGameSecondsPerTick
    this.minutes = this.seconds / 60
    this.hours = this.minutes / 60

    this.darkness = this.hours / 24

    this.fullScreenQuad.alpha = this.darkness

    if (this.hours >= 24) {
      this.seconds = 0
      this.day += 1

      this.With(ObjectCrops, obj => {
        obj.AddOneDay()
      })

      if (this.day > 30) {
        this.day = 1
        this.season += 1
        if (this.season > 4) {
          this.season = 1
          this.year += 1
        }
      }
    }

    this.fullScreenQuad.x = -this.room.game.app.stage.position.x
    this.fullScreenQuad.y = -this.room.game.app.stage.position.y

    this.basicText.setText(this.day)
    this.basicText.x = -this.room.game.app.stage.position.x + 30
    this.basicText.y = -this.room.game.app.stage.position.y + 90
  }

  Destroy () {
    console.log('ObjectGame Destroy')
    this.room.game.UI.removeChild(this.fullScreenQuad)
    this.room.game.UI.removeChild(this.basicText)
  }
}
