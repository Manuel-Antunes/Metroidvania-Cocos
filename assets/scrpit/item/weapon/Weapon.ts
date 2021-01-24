// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Item from "../Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Weapons extends Item {
  @property
  damage: number = 0

  @property(cc.Sprite)
  sprite: cc.Sprite = null

  attack(damage: number) {
    console.log((damage / 20) * damage)
  }
}
