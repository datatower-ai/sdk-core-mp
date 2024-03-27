import { _decorator, Button, Component } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("userDelete")
export class userDelete extends Component {
  start() {
    const button = this.node.getComponent(Button);
    if (button) {
      button.node.on("click", () => DataTower.userDelete(), this);
    }
  }
}
