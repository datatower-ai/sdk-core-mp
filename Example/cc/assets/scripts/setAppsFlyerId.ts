import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("setAppsFlyerId")
export class setAppsFlyerId extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;

    const submit = () => DataTower.setAppsFlyerId(editBox.string);
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
