// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Weapon from '../../item/weapon/Weapon';
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
  attacking_jumping = 'attacking_jumping',
  attacking_with_weapon = 'attacking_with_weapon',
  attacking_with_weapon_jumping = 'attacking_with_weapon_jumping',
}

@ccclass
export default class Player extends Actor {

  constructor() {
    super();
  }


  get isAttacking() {
    return this.state === PLAYER_STATE.attacking;
  }

  attackThreshold: number = 0.7;

  @property(cc.Prefab)
  Weapon: cc.Prefab = null

  EquipedWeapon: Weapon = null

  state: PLAYER_STATE;

  attackCoolDown: number = 0;

  walkForce: number;

  jumpForce: number;

  get canAttack() {
    return this.attackCoolDown === 0;
  }

  attack() {
    if (this.canAttack) {
      if (this.state === PLAYER_STATE.idle_0 || this.state === PLAYER_STATE.idle_1 || this.state === PLAYER_STATE.walking_0 || this.state === PLAYER_STATE.walking_1) {
        if (this.state === PLAYER_STATE.walking_0 || this.state === PLAYER_STATE.walking_1) {
          this.rigidBody.linearVelocity = cc.v2(0, 0)
        }
        if (this.EquipedWeapon) {
          this.setState(PLAYER_STATE.attacking_with_weapon)
        } else {
          this.setState(PLAYER_STATE.attacking)
        }
      }
      if (this.state === PLAYER_STATE.jumping_idle || this.state === PLAYER_STATE.jumping_walking || this.state === PLAYER_STATE.falling) {
        if (this.EquipedWeapon) {
          this.setState(PLAYER_STATE.attacking_with_weapon_jumping)
        } else {
          this.setState(PLAYER_STATE.attacking_jumping)
        }
      }
      this.performAttack()
    }
  }

  onLoad() {
    super.onLoad()
    this.walkForce = 15000
    this.jumpForce = 300000
    this.state = PLAYER_STATE.idle_0
    this.EquipedWeapon = this.Weapon && this.Weapon.data.getComponent<Weapon>(Weapon)
    console.log(this.EquipedWeapon.title)
  }
  update(dt) {
    console.log(this.isAttacking);
    if (!this.isAttacking) {
      if (
        (this.direction > 0 && this.rigidBody.linearVelocity.x < this.maxVelocityX) ||
        (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.maxVelocityX)
      ) {
        this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true)
      }
    } else {
      console.log('aksdnlksand')
    }
    if (this.attackCoolDown > 0) {
      this.attackCoolDown += dt;
      if (this.attackCoolDown > (this.attackThreshold + 1)) {
        this.attackCoolDown = 0;
      }
    }
  }
  move(direction: DIRECTION) {
    if (this.state !== PLAYER_STATE.attacking) {
      if (direction === this.facing) {
        this.direction = direction
      } else {
        this.reface(direction)
      }
    }
  }
  jump() {
    if (this.falling && this.state !== PLAYER_STATE.attacking) {
      this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true)
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
    if (this.state === PLAYER_STATE.reface) {
      this.direction = direction;
      return
    }
    if (this.state === PLAYER_STATE.idle_0 || this.state === PLAYER_STATE.idle_1) {
      this.node.setScale(this.node.scaleX * -1, this.node.scaleY)
      this.setState(PLAYER_STATE.reface)
    } else {
      this.refaceEnd()
    }
    this.facing = direction
    this.move(direction)
  }
  refaceEnd() {
    if (this.state !== PLAYER_STATE.reface) {
      this.node.setScale(this.node.scaleX * -1, this.node.scaleY)
    }
    this.setState(PLAYER_STATE.idle_1)
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    if (self.tag === 3) {
      console.log(self.tag)
      console.log("Currently colliding");
    }
  }
  onCollisionExit(other, self) {
    if (self.tag === 3) {
      console.log("Done colliding");
    }
  }

  performAttack() {
    const random = Math.ceil(Math.random() * 19) + 1
    this.attackCoolDown = 1;
    if (this.EquipedWeapon) {
      this.EquipedWeapon.attack(random)
    }
  }

  getWeapon() {

  }
}
