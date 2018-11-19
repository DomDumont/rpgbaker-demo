import { GameObject } from 'rpgbaker'

export default class ObjectTransitions extends GameObject {
  Init () {
    super.Init()

    this.targetRoom = this.jsonObject.properties[0].value // TargetRoom property
    this.targetX = this.jsonObject.properties[1].value
    this.targetY = this.jsonObject.properties[2].value

    console.log(this.targetRoom)
  }
}
