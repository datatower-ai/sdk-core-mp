import { _decorator, Button, Component } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("clearStaticCommonProperties")
export class clearStaticCommonProperties extends Component {
  start() {
    const button = this.node.getComponent(Button);
    const submit = () => DataTower.clearStaticCommonProperties();
    button.node.on("click", submit, this);
  }
}
