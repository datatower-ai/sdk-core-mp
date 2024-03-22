import { _decorator, Component, EditBox } from "cc";
import { DataTower } from "../libs/dt-sdk/index.mjs";

const { ccclass, property } = _decorator;

@ccclass("track")
export class track extends Component {
  start() {
    const editBox = this.node.getComponent(EditBox);
    editBox.maxLength = -1;
    if (editBox) {
      editBox.node.on(
        "text-changed",
        (event) => {
          console.log("track：", event._string);
        },
        this
      );
      editBox.node.on(
        "editing-did-ended",
        (event) => {
          const { eventName, properties } = JSON.parse(event._string);
          DataTower.track(eventName, properties);
          console.log("submit track：", event._string);
        },
        this
      );
    }
  }

  update(deltaTime: number) {}
}
