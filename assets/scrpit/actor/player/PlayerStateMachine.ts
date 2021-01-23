// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StateMachine from "../../util/StateMachine";
import Player, { PLAYER_STATE } from "./Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerStateMachine extends StateMachine<Player> {
  update(dt: any) {
    if (this.actor.state === PLAYER_STATE.idle_0 || this.actor.state === PLAYER_STATE.idle_1) {
      if (this.actor.rigidBody.linearVelocity.x !== 0) {
        this.actor.setState(PLAYER_STATE.walking_0)
      }
    }
    if ((this.actor.state === PLAYER_STATE.walking_1)) {
      if (this.actor.rigidBody.linearVelocity.x == 0 && this.actor.rigidBody.linearVelocity.y == 0) {
        this.actor.setState(PLAYER_STATE.idle_0)
      }
    }
    if ((this.actor.state === PLAYER_STATE.walking_0)) {
      if (this.actor.rigidBody.linearVelocity.x == 0 && this.actor.rigidBody.linearVelocity.y == 0) {
        this.actor.setState(PLAYER_STATE.idle_1)
      }
    }
    if ((this.actor.state === PLAYER_STATE.jumping_idle || this.actor.state === PLAYER_STATE.jumping_walking)) {
      if (this.actor.rigidBody.linearVelocity.y == 0 && this.actor.falling) {
        console.log(this.actor.rigidBody.linearVelocity.y)
        this.actor.setState(PLAYER_STATE.idle_0)
      }
    }
  }
  onAnimationEnd(animation) {
    if (animation === PLAYER_STATE.walking_0) {
      this.actor.setState(PLAYER_STATE.walking_1)
    }
    if (animation === PLAYER_STATE.idle_1) {
      this.actor.setState(PLAYER_STATE.idle_0)
    }
  }
}
