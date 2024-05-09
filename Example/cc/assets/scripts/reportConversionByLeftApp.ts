import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("reportConversionByLeftApp")
export class reportConversionByLeftApp extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"id":"","type":-1,"platform":-1,"mediation":-1,"mediationId":"","seq":"seq","properties":{},"location":"","entrance":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportConversionByLeftApp(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
