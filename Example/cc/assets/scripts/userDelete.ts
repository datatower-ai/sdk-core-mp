import { _decorator, Button, Component } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("getDataTowerId")
export class getDataTowerId extends Component {
  start() {
    const button = this.node.getComponent(Button);
    if (button) {
      button.node.on("click", () => DataTower.userDelete(), this);
    }
  }
}
