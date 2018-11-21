import { Room } from 'rpgbaker'
import ObjectGame from '../objects/object_game'

export default class RoomMain extends Room {
  Init () {
    console.log('RoomMain Init')

    let tempGame = new ObjectGame('game', this)
    this.AddGAO(tempGame)
    this.addChild(tempGame)

    this.game.RoomGoto('MenuRoom')
    super.Init()
  }
}
