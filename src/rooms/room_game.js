import ObjectCollisions from '../objects/object_collisions'
import ObjectPlayer from '../objects/object_player'
import ObjectNPC from '../objects/object_npc'
import { Room, TileMap } from 'rpgbaker'

const map01 = require('../assets/map01.json')

export default class RoomGame extends Room {
  Init () {
    let tileMap = new TileMap(map01, (tilelayer, obj) => {
      switch (obj.type) {
        case 'COLLISIONS':
          this.AddGAO(tilelayer, new ObjectCollisions(this, obj))
          break
        case 'PLAYER':
          let tempPlayer = new ObjectPlayer(this, obj)
          this.AddGAO(tilelayer, tempPlayer)
          this.game.camera.Follow(tempPlayer)
          break
        case 'NPC':
          let tempNPC = new ObjectNPC(this, obj)
          this.AddGAO(tilelayer, tempNPC)

          break
      }
    })
    tileMap.Init()
    this.addChild(tileMap)
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
