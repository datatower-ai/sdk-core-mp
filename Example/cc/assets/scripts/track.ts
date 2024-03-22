import { _decorator, Component, EditBox } from "cc";
import * as DataTower from "../libs/index.mjs";

const { ccclass, property } = _decorator;

@ccclass("track")
export class track extends Component {
  start() {
    const editBox = this.node.getComponent(EditBox);
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
          DataTower.track(JSON.parse(event._string));
          console.log("submit track：", event._string);
        },
        this
      );
    }
  }

  update(deltaTime: number) {}
}
