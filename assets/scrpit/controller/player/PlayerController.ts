// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameController from "../GameController"

const { ccclass, property } = cc._decorator
import Player from '../../actor/player/Player'
import { DIRECTION } from "../../actor/Actor";

@ccclass()
export default class PlayerController extends GameController {

  @property(Player)
  player: Player = null;

  onLoad() {
    super.onLoad()
    console.log(this.player)
  }

  onKeyPressed(event: cc.Event.EventKeyboard) {
    const code = event.keyCode
    switch (code) {
      case cc.macro.KEY.left:
        this.player.move(DIRECTION.LEFT)
        break
      case cc.macro.KEY.right:
        this.player.move(DIRECTION.RIGHT)
        break
      case cc.macro.KEY.z:
        this.player.jump()
        break
      case cc.macro.KEY.x:
        this.player.attack()
      default:
        break
    }
  }
  onKeyReleased(event: cc.Event.EventKeyboard) {
    const code = event.keyCode

    switch (code) {
      case cc.macro.KEY.left:
      case cc.macro.KEY.right:
        this.player.direction = 0
        break
      default:
        break
    }
  }

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() { }

  // update (dt) {}
}
