import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportPaid")
export class reportPaid extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"value":0,"precision":"","location":"","id":"","type":-1,"platform":-1,"mediation":-1,"mediationId":"","seq":"seq","properties":{},"country":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportPaid(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
