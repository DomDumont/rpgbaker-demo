import { Room } from "rpgbaker";
const PIXI = require("pixi.js");
import utils from "../utils";

export default class RoomPause extends Room {
  Init() {
    let msgResume = new PIXI.Text("Resume", utils.style1);

    msgResume.position.set(350, 200);
    msgResume.interactive = true;
    msgResume.buttonMode = true;

    // Pointers normalize touch and mouse
    msgResume.on("pointerdown", () => {
      this.game.RoomGoto("GameRoom");
      // pauseScene.visible = false
      // gameScene.visible = true
    });

    let msgQuit = new PIXI.Text("Quit", utils.style1);
    msgQuit.position.set(350, 300);

    msgQuit.interactive = true;
    msgQuit.buttonMode = true;

    // Pointers normalize touch and mouse
    msgQuit.on("pointerdown", () => {
      this.game.RoomGoto("MenuRoom");
      // pauseScene.visible = false
      // menuScene.visible = true
    });

    this.addChild(msgResume);
    this.addChild(msgQuit);
  }
  Update(delta) {
    if (this.game.input.IsKeyPressed(27)) {
      console.log("resume by esc key");
      this.game.RoomGoto("GameRoom");
      //    gameScene.visible = true
      //    pauseScene.visible = false
    }
  }
}
