import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("setAccountId")
export class setAccountId extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `accountId`;

    const submit = () => DataTower.setAccountId(editBox.string);
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
