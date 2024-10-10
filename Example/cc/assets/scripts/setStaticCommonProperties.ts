import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("setStaticCommonProperties")
export class setStaticCommonProperties extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"key":"boolean,string,number"}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.setStaticCommonProperties(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
