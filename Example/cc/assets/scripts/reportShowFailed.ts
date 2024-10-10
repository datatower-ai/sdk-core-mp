import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportShowFailed")
export class reportShowFailed extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"id":"","type":-1,"platform":-1,"mediation":-1,"mediationId":"","seq":"seq","properties":{},"location":"","entrance":"","errorCode":0,"errorMessage":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportShowFailed(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
