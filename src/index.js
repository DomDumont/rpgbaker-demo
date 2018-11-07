import { Game, Input } from "rpgbaker";
import RoomMenu from "./rooms/room_menu";

const femaleBody = require("./assets/female-body.png");
const tileTerrain = require("./assets/spr_tile_terrain.png");

PIXI.loader.add(femaleBody);
PIXI.loader.add(tileTerrain);

let myGame = new Game(800, 600);

myGame.AddRoom("MenuRoom", new RoomMenu());
myGame.Init();
myGame.RoomGoto("MenuRoom");
