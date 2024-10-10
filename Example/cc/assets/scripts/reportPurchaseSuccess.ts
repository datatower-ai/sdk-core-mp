import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportPurchaseSuccess")
export class reportPurchaseSuccess extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"sku":"","price":0,"currency":"","order":"","properties":{}}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportPurchaseSuccess(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
