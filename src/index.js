import { Game } from 'rpgbaker'
import RoomMenu from './rooms/room_menu'
import RoomGame from './rooms/room_game'
import RoomPause from './rooms/room_pause'
import RoomMain from './rooms/room_main'
import RoomInterior from './rooms/room_interior'

const PIXI = require('pixi.js')

const femaleBody = require('./assets/female-body.png')
const femaleDress = require('./assets/tightdress_red.png')
const femaleHair = require('./assets/blonde2.png')

const tileTerrain = require('./assets/spr_tile_terrain.png')
const tileCottage = require('./assets/spr_tile_cottage.png')
const tileInterior = require('./assets/spr_tile_interior.png')

const shadow = require('./assets/shadow.png')

const maleBody = require('./assets/male-body.png')
const maleDress = require('./assets/teal_longsleeve.png')
const maleHair = require('./assets/mohawk.png')

const crops = require('./assets/spr_crops.png')
const cropsPicked = require('./assets/spr_crops_picked_strip7.png')

// localStorage.debug = 'OhYes'
localStorage.debug = ''

PIXI.loader.add(femaleBody)
PIXI.loader.add(femaleDress)
PIXI.loader.add(femaleHair)
PIXI.loader.add(tileTerrain)
PIXI.loader.add(tileCottage)
PIXI.loader.add(tileInterior)
PIXI.loader.add(shadow)
PIXI.loader.add(maleBody)
PIXI.loader.add(maleDress)
PIXI.loader.add(maleHair)
PIXI.loader.add(crops)
PIXI.loader.add(cropsPicked)

let myGame = new Game(800, 600)

myGame.AddRoom(new RoomMain('MainRoom'))
myGame.AddRoom(new RoomMenu('MenuRoom'))
myGame.AddRoom(new RoomGame('GameRoom'))
myGame.AddRoom(new RoomPause('PauseRoom'))
myGame.AddRoom(new RoomInterior('InteriorRoom'))
myGame.Init()
myGame.RoomGoto('MainRoom')
