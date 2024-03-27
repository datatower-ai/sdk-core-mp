import { _decorator, Button, Component } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("clearCommonProperties")
export class clearCommonProperties extends Component {
  start() {
    const button = this.node.getComponent(Button);
    button.node.on("click", () => DataTower.clearCommonProperties(), this);
  }
}
