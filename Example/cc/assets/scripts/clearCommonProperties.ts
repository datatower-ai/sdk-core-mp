import { _decorator, Button, Component } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/web.mjs";

const { ccclass } = _decorator;

@ccclass("clearDynamicCommonProperties")
export class clearDynamicCommonProperties extends Component {
  start() {
    const button = this.node.getComponent(Button);
    button.node.on("click", () => DataTower.clearDynamicCommonProperties(), this);
  }
}
