import { Room } from 'rpgbaker'
import utils from '../utils'
const PIXI = require('pixi.js')

export default class RoomMenu extends Room {
  Init () {
    console.log('RoomMenu Init')
    // scenes creation

    let msgPlay = new PIXI.Text('Play', utils.style1)
    // msgPlay.parentGroup = this.game.groups.get("0");
    // msgPlay.parentLayer = this.game.layers.get("0");
    msgPlay.position.set(350, 200)
    msgPlay.interactive = true
    msgPlay.buttonMode = true

    // Pointers normalize touch and mouse
    msgPlay.on('pointerdown', () => {
      this.game.RoomGoto('GameRoom')
    })

    this.addChild(msgPlay)
    super.Init()
  }

  Update (delta) {
    super.Update(delta)
  }
}
