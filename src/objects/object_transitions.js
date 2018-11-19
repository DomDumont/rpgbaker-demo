import { GameObject } from 'rpgbaker'

export default class ObjectTransitions extends GameObject {
  Init () {
    super.Init()

    this.targetRoom = this.jsonObject.properties[0].value // TargetRoon property
    console.log(this.targetRoom)
  }
}
