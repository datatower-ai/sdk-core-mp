import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportLoadEnd")
export class reportLoadEnd extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"id":"","type":-1,"platform":-1,"mediation":-1,"mediationId":"","seq":"seq","properties":{},"duration":0,"result":false,"errorCode":0,"errorMessage":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportLoadEnd(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
