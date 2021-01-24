// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

  @property(cc.SpriteFrame)
  trumbnailSpriteFrame: cc.SpriteFrame = null;

  @property
  title: string = '';

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    console.log(this.title)
  }

  // update (dt) {}
}
