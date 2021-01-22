// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default abstract class Actor extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null

  @property(cc.RigidBody)
  rigidBody: cc.RigidBody

  @property
  text: string = 'hello'

  // LIFE-CYCLE CALLBACKS:

  onLoad() { }

  start() { }

  // update (dt) {}
}
