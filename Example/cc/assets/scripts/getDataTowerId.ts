import { _decorator, Button, Component } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("getDataTowerId")
export class getDataTowerId extends Component {
  start() {
    const button = this.node.getComponent(Button);
    const click = () => {
      DataTower.getDataTowerId((id) => {
        console.log("getDataTowerId response：", id);
      });
    };
    button.node.on("click", click, this);
  }
}
