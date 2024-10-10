import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("setKochavaId")
export class setKochavaId extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `kochavaId`;

    const submit = () => DataTower.setKochavaId(editBox.string);
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
