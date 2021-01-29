// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default abstract class GameController extends cc.Component {

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this)
  }

  // eslint-disable-next-line no-unused-vars
  abstract onKeyPressed(event: cc.Event.EventKeyboard)

  // eslint-disable-next-line no-unused-vars
  abstract onKeyReleased(event: cc.Event.EventKeyboard)
}
