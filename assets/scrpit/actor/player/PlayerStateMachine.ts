// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StateMachine from "../../util/StateMachine";
import { DIRECTION } from "../Actor";
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
    if ((this.actor.state === PLAYER_STATE.falling)) {
      if (this.actor.rigidBody.linearVelocity.y == 0 && this.actor.falling) {
        this.actor.setState(PLAYER_STATE.jump_end)
      }
    }
    if (this.actor.state === PLAYER_STATE.idle_0 || this.actor.state === PLAYER_STATE.idle_1 || this.actor.state === PLAYER_STATE.walking_0 || this.actor.state === PLAYER_STATE.walking_1) {
      if (this.actor.rigidBody.linearVelocity.y !== 0) {
        this.actor.setState(PLAYER_STATE.falling)
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
    if (animation === PLAYER_STATE.jumping_walking || animation === PLAYER_STATE.jumping_idle) {
      this.actor.setState(PLAYER_STATE.falling)
    }
    if (animation === PLAYER_STATE.jump_end) {
      this.actor.setState(PLAYER_STATE.idle_0)
    }
    if (animation === PLAYER_STATE.attacking || animation === PLAYER_STATE.attacking_with_weapon) {
      this.actor.setState(PLAYER_STATE.idle_0)
    }
    if (animation === PLAYER_STATE.attacking_jumping || animation === PLAYER_STATE.attacking_with_weapon_jumping) {
      this.actor.setState(PLAYER_STATE.falling)
    }
    if (animation === PLAYER_STATE.reface) {
      this.actor.refaceEnd()
    }
  }
}
