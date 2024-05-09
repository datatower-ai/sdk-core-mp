import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/dist/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("trackTimerStart")
export class trackTimerStart extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `eventName`;

    const submit = () => DataTower.trackTimerStart(editBox.string);
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
