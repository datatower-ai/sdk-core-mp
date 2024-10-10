import { _decorator, Button, Component } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("enableUpload")
export class enableUpload extends Component {
  start() {
    const button = this.node.getComponent(Button);
    button.node.on("click", () => DataTower.enableUpload(), this);
  }
}
