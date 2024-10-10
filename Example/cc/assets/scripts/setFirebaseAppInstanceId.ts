import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("setFirebaseAppInstanceId")
export class setFirebaseAppInstanceId extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `firebaseAppInstanceId`;

    const submit = () => DataTower.setFirebaseAppInstanceId(editBox.string);
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
