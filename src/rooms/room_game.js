import ObjectCollisions from '../objects/object_collisions'
import ObjectPlayer from '../objects/object_player'
import ObjectNPC from '../objects/object_npc'
import ObjectTransitions from '../objects/object_transitions'
import { Room, TileMap, Input } from 'rpgbaker'
import ObjectCrops from '../objects/object_crops'

const PIXI = require('pixi.js')

const map01 = require('../assets/map01.json')

export default class RoomGame extends Room {
  Init () {
    this.tileMap = new TileMap(map01, (tilelayer, obj) => {
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
    this.tileMap.Init()
    this.tileMap.interactive = true // Test
    this.tileMap.on('pointerdown', this.OnMouseClick.bind(this))
    this.tileMap.on('pointermove', this.OnMouseMove.bind(this))
    this.tileMap.on('scroll', this.OnMouseScroll.bind(this))

    this.addChild(this.tileMap)

    this.roomWidth = this.tileMap.width
    this.roomHeight = this.tileMap.height

    // Crops Manager
    this.crops = new ObjectCrops('CropsManager', this)
    this.crops.Init()
    this.crops.parentGroup = this.game.groups.get('1')
    this.AddGAO(this.crops)
    this.addChild(this.crops)

    super.Init()
  }

  OnMouseMove (event) {
    this.crops.OnMouseMove(event)
  }

  OnMouseScroll (event) {
    this.crops.OnMouseScroll(event)
  }

  OnMouseClick (event) {
    this.crops.OnMouseClick(event)
  }
  Update (delta) {
    // console.log("room game update");
    if (this.game.input.IsKeyPressed(Input.Keycodes.ESCAPE)) {
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
