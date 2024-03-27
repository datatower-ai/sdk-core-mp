import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("userUnset")
export class userUnset extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;

    const submit = () => {
      const data = editBox.string.split(",").map((item) => item.trim());
      DataTower.userUnset(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
