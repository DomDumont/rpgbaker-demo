import ObjectCollisions from '../objects/object_collisions'
import ObjectPlayer from '../objects/object_player'
import { Room, TileMap } from 'rpgbaker'

const map01 = require('../assets/map01.json')
const texture01 = require('../assets/spr_tile_terrain.png')

export default class RoomGame extends Room {
  Init () {
    let tileMap = new TileMap(map01, obj => {
      console.dir(obj)
      switch (obj.type) {
        case 'COLLISIONS':
          this.AddGAO(new ObjectCollisions(this, obj))
          break
        case 'PLAYER':
          let tempPlayer = new ObjectPlayer(this, obj)
          this.AddGAO(tempPlayer)
          this.game.camera.Follow(tempPlayer)
          break
      }
    })
    tileMap.Init(texture01)
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
}

// const { Howl, Howler } = require('howler')
// const testMusic = require('./assets/test.mp3')
/*
  var sound = new Howl({
    src: [testMusic]
  })

  // saoulant sound.play();
  */
