import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportSubscribeSuccess")
export class reportSubscribeSuccess extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"sku":"","price":0,"currency":"","properties":{},"originalOrderId":"","orderId":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportSubscribeSuccess(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
