import { Game, Input } from "rpgbaker";
import RoomMenu from "./rooms/room_menu";
import RoomGame from "./rooms/room_game";
import RoomPause from "./rooms/room_pause";

const femaleBody = require("./assets/female-body.png");
const tileTerrain = require("./assets/spr_tile_terrain.png");

PIXI.loader.add(femaleBody);
PIXI.loader.add(tileTerrain);

let myGame = new Game(800, 600);

myGame.AddRoom("MenuRoom", new RoomMenu());
myGame.AddRoom("GameRoom", new RoomGame());
myGame.AddRoom("PauseRoom", new RoomPause());
myGame.Init();
myGame.RoomGoto("MenuRoom");
