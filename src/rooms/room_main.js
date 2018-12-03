import { Room } from 'rpgbaker'
import ObjectGame from '../objects/object_game'
import ObjectDayCycle from '../objects/object_daycycle'

export default class RoomMain extends Room {
  Init () {
    console.log('RoomMain Init')

    let tempGame = new ObjectGame('game', this)
    this.AddGAO(tempGame)
    this.addChild(tempGame)

    let tempDayCycle = new ObjectDayCycle('daycycle', this)
    this.AddGAO(tempDayCycle)
    this.addChild(tempDayCycle)

    this.game.RoomGoto('MenuRoom')
    super.Init()
  }
}
