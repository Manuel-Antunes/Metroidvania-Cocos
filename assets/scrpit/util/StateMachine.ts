// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor from "../actor/Actor";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StateMachine extends cc.Component {

  state = []
  // LIFE-CYCLE CALLBACKS:
  actor: Actor = null
  onLoad() {
    this.actor = this.node.getComponent(Actor)
  }

  start() {

  }

  // update (dt) {}
}
