import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("reportLoadBegin")
export class reportLoadBegin extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"id":"","type":-1,"platform":-1,"mediation":-1,"mediationId":"","seq":"seq","properties":{},"location":"","entrance":""}`;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.reportLoadBegin(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
