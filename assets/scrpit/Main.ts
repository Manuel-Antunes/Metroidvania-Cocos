// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null

  @property
  text: string = 'hello'

  // LIFE-CYCLE CALLBACKS:
  private physicsManager: cc.PhysicsManager

  onLoad() {
    this.physicsManager = cc.director.getPhysicsManager()
    this.physicsManager.enabled = true
    this.physicsManager.gravity = cc.v2(0, -2000)
    cc.director.getCollisionManager().enabledDebugDraw = true;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true;
  }

  // update (dt) {}
}
