import { GameObject } from 'rpgbaker'

export default class ObjectCollisions extends GameObject {
  Init () {
    super.Init()

    this.parentGroup = this.room.game.groups.get('1')
    // this.SetHitArea(new PIXI.Rectangle(17, 54, 30, 10))
  }
}
