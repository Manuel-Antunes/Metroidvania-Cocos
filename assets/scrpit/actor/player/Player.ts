// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor, { DIRECTION } from '../Actor';
const { ccclass, property } = cc._decorator;

export enum PLAYER_STATE {
  idle_0 = 'idle_0',
  idle_1 = 'idle_1',
  turning_arround = 'turning_arround',
  walking_0 = 'walking_0',
  walking_1 = 'walking_1',
  jumping_idle = 'jumping_idle',
  jumping_walking = 'jumping_walking',
  falling = 'falling',
  jump_end = 'jump_end',
  reface = 'reface',
  attacking = 'attacking',
  attacking_jumping = 'attacking_jumping'
}

@ccclass
export default class Player extends Actor {

  constructor() {
    super();
  }

  state: PLAYER_STATE

  walkForce: number

  jumpForce: number

  attack() {
    if (this.state === PLAYER_STATE.idle_0 || this.state === PLAYER_STATE.idle_1) {
      this.setState(PLAYER_STATE.attacking)
    }
    if (this.state === PLAYER_STATE.jumping_idle || this.state === PLAYER_STATE.jumping_walking || this.state === PLAYER_STATE.falling) {
      this.setState(PLAYER_STATE.attacking_jumping)
    }
  }

  onLoad() {
    super.onLoad()
    this.walkForce = 15000
    this.jumpForce = 300000
    this.state = PLAYER_STATE.idle_0
  }
  update(dt) {
    if (
      (this.direction > 0 && this.rigidBody.linearVelocity.x < this.maxVelocityX) ||
      (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.maxVelocityX)
    ) {
      this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true)
    }
  }
  move(direction: DIRECTION) {
    if (this.state !== PLAYER_STATE.reface) {
      if (direction === this.facing) {
        this.direction = direction
      } else {
        this.reface(direction)
      }
    }
  }
  jump() {
    if (this.falling) {
      this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true)
      this.falling = false
      if (this.direction === DIRECTION.IDLE) {
        this.setState(PLAYER_STATE.jumping_idle)
      } else {
        this.setState(PLAYER_STATE.jumping_walking)
      }
    }
  }
  setState(state: PLAYER_STATE) {
    if (this.state !== state) {
      this.state = state
      const a = this.node.getComponent(cc.Animation)
      a.play(state)
      this.setCurrentAnimation(a.currentClip)
    }
  }
  setCurrentAnimation(clip: cc.AnimationClip) {
    if (clip.name === PLAYER_STATE.walking_0) {
      const a = this.node.getComponent(cc.Animation)
    }
  }
  reface(direction: DIRECTION) {
    if (this.state !== PLAYER_STATE.jump_end && this.state !== PLAYER_STATE.jumping_walking && this.state !== PLAYER_STATE.jumping_idle && this.state !== PLAYER_STATE.falling) {
      if (this.state !== PLAYER_STATE.idle_0 && this.state !== PLAYER_STATE.idle_1) {
        this.setState(PLAYER_STATE.reface)
      } else {
        this.refaceEnd()
      }
      this.facing = direction
      this.move(direction)
    }
  }
  refaceEnd() {
    this.node.setScale(this.node.scaleX * -1, this.node.scaleY)
    this.setState(PLAYER_STATE.idle_1)
  }
}
