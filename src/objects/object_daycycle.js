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

    this.nbGameSecondsPerTick = 500

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
    this.basicText.y = 30

    this.room.game.UI.addChild(this.basicText)

    this.drawDayLight = false
  }

  OnRoomStart () {
    super.OnRoomStart()
    switch (this.room.game.currentRoomKey) {
      case 'GameRoom':
        this.drawDayLight = true
        break

      default:
        this.drawDayLight = false
    }
  }
  Update (delta) {
    super.Update(delta)

    this.seconds += this.nbGameSecondsPerTick
    this.minutes = this.seconds / 60
    this.hours = this.minutes / 60

    this.darkness = this.hours / 24

    if (this.drawDayLight) {
      this.fullScreenQuad.alpha = this.darkness
    } else {
      this.fullScreenQuad.alpha = 0
    }

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

    this.basicText.setText(
      '\n Day ' + this.day + '\n Season ' + this.season + '\n Year ' + this.year
    )
  }

  Destroy () {
    console.log('ObjectGame Destroy')
    this.room.game.UI.removeChild(this.fullScreenQuad)
    this.room.game.UI.removeChild(this.basicText)
  }
}
