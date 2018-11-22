import ObjectCollisions from '../objects/object_collisions'
import ObjectPlayer from '../objects/object_player'
import ObjectNPC from '../objects/object_npc'
import ObjectTransitions from '../objects/object_transitions'
import { Room, TileMap } from 'rpgbaker'

const map01 = require('../assets/map01.json')

export default class RoomGame extends Room {
  Init () {
    let tileMap = new TileMap(map01, (tilelayer, obj) => {
      switch (obj.type) {
        case 'TRANSITIONS':
          let newTransition = new ObjectTransitions('transition', this, obj)
          this.AddGAO(newTransition)
          this.addChild(newTransition)
          break
        case 'COLLISIONS':
          let newCollision = new ObjectCollisions('collision', this, obj)
          this.AddGAO(newCollision)
          this.addChild(newCollision)
          break
        case 'PLAYER':
          let tempPlayer = new ObjectPlayer('player', this, obj)
          this.AddGAO(tempPlayer)
          this.addChild(tempPlayer)
          tempPlayer.parentGroup = this.game.groups.get('1')
          this.game.camera.Follow(tempPlayer)
          break
        case 'NPC':
          let tempNPC = new ObjectNPC('npc', this, obj)
          tempNPC.parentGroup = this.game.groups.get('1')
          this.AddGAO(tempNPC)
          this.addChild(tempNPC)
          break
      }
    })
    tileMap.Init()
    this.addChild(tileMap)

    this.roomWidth = tileMap.width
    this.roomHeight = tileMap.height
    super.Init()
  }

  Update (delta) {
    // console.log("room game update");
    if (this.game.input.IsKeyPressed(27)) {
      console.log('pause by esc key')
      this.game.RoomGoto('PauseRoom')
    }
    super.Update(delta)
  }

  Destroy () {
    super.Destroy()
    this.game.camera.Follow(undefined)
  }
}

// const { Howl, Howler } = require('howler')
// const testMusic = require('./assets/test.mp3')
/*
  var sound = new Howl({
    src: [testMusic]
  })

  // saoulant sound.play();
  */
