import { Game, Input } from 'rpgbaker'
import RoomMenu from './rooms/room_menu'
import RoomGame from './rooms/room_game'
import RoomPause from './rooms/room_pause'
const PIXI = require('pixi.js')

const femaleBody = require('./assets/female-body.png')
const femaleDress = require('./assets/tightdress_red.png')
const femaleHair = require('./assets/blonde2.png')

const tileTerrain = require('./assets/spr_tile_terrain.png')
const tileCottage = require('./assets/spr_tile_cottage.png')

PIXI.loader.add(femaleBody)
PIXI.loader.add(femaleDress)
PIXI.loader.add(femaleHair)
PIXI.loader.add(tileTerrain)
PIXI.loader.add(tileCottage)

let myGame = new Game(800, 600)

myGame.AddRoom('MenuRoom', new RoomMenu())
myGame.AddRoom('GameRoom', new RoomGame())
myGame.AddRoom('PauseRoom', new RoomPause())
myGame.Init()
myGame.RoomGoto('MenuRoom')
