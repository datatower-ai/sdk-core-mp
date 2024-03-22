import { _decorator, Button, Component } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";
import { getDataTowerIdMessage } from "./getDataTowerIdMessage";

const { ccclass, property } = _decorator;

@ccclass("getDataTowerId")
export class getDataTowerId extends Component {
  start() {
    const button = this.node.getComponent(Button);
    if (button) {
      button.node.on("click", this.onButtonClick, this);
    }
  }

  update(deltaTime: number) {}

  onButtonClick() {
    DataTower.getDataTowerId((id) => {
      const toastNode = this.node
        .getChildByName("message")
        .getComponent(getDataTowerIdMessage);
      if (toastNode) {
        toastNode.showToast(id);
      }
      console.log("getDataTowerId：", id);
    });
  }
}
