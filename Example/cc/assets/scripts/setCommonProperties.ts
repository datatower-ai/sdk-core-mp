import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("setDynamicCommonProperties")
export class setDynamicCommonProperties extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `123`;

    const callback = () => {
      return { common_property: editBox.string };
    };

    const submit = () => {
      DataTower.setDynamicCommonProperties(callback);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
