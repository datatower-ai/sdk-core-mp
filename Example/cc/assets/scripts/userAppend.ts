import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("userAppend")
export class userAppend extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;

    const submit = () => {
      const data = JSON.parse(editBox.string);
      DataTower.userAppend(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
