// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  player: cc.Node = null;

  @property(cc.Node)
  bounds: cc.Node = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  update(dt) {
    const targetPosition = this.player.getPosition()
    const currentY = this.node.parent.convertToWorldSpaceAR(this.bounds.getPosition()).y;
    const currentX = this.node.parent.convertToWorldSpaceAR(this.bounds.getPosition()).x;
    targetPosition.y = cc.misc.clampf(targetPosition.y, currentY, (this.bounds.height * this.bounds.scaleY) - this.node.parent.height);
    targetPosition.x = cc.misc.clampf(targetPosition.x, currentX, (this.bounds.width * this.bounds.scaleX) - this.node.parent.width)
    this.node.setPosition(targetPosition);
  }


}
