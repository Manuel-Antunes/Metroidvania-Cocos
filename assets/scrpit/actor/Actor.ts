// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass } = cc._decorator

export enum DIRECTION {
  LEFT = -1,
  RIGHT = 1,
  IDLE = 0
}

@ccclass
export default abstract class Actor extends cc.Component {
  rigidBody: cc.RigidBody

  maxVelocityX: number

  falling: boolean

  facing: DIRECTION

  // LIFE-CYCLE CALLBACKS:
  direction: DIRECTION

  onLoad() {
    this.direction = DIRECTION.IDLE
    this.maxVelocityX = 400
    this.rigidBody = this.node.getComponent(cc.RigidBody)
    this.falling = false
  }

  onBeginContact(contact: any, selfCollider: cc.Collider, otherCollider: cc.Collider) {
    if (selfCollider.tag === 2) {
      this.falling = true
      console.log('pão de milho')
    }
  }

}
