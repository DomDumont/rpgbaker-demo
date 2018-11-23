import ObjectCollisions from '../objects/object_collisions'
import ObjectPlayer from '../objects/object_player'
import ObjectNPC from '../objects/object_npc'
import ObjectTransitions from '../objects/object_transitions'
import { Room, TileMap } from 'rpgbaker'
import ObjectCrops from '../objects/object_crops'
import ObjectCrop from '../objects/object_crop'

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
    tileMap.interactive = true // Test
    tileMap.on('pointerdown', this.OnClick.bind(this))
    tileMap.on('pointermove', this.OnMouseMove.bind(this))
    tileMap.on('scroll', this.OnMouseScroll.bind(this))

    this.addChild(tileMap)

    this.roomWidth = tileMap.width
    this.roomHeight = tileMap.height

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

  OnClick (event) {
    if (this.crops.planting === false) return
    let mousePos = new PIXI.Point(event.data.global.x, event.data.global.y)
    let localMousePos = this.toLocal(mousePos)
    console.log(
      'Plant Crop at ' + event.data.global.x + ' ' + event.data.global.y
    )
    // console.dir(event.data)
    // mouxe X = event.data.global.x
    let tempCrop = new ObjectCrop('Crop', this)
    tempCrop.cropType = this.crops.selectCrop
    tempCrop.growthStage = 4 // Test purpose only
    tempCrop.Init()
    tempCrop.parentGroup = this.game.groups.get('1')
    tempCrop.SetPosition(localMousePos.x, localMousePos.y)
    this.AddGAO(tempCrop)
    this.addChild(tempCrop)
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
