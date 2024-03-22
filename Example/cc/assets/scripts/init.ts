import { Component, EditBox, _decorator } from "cc";
import * as DataTower from "../libs/index.mjs";

const { ccclass, property } = _decorator;

@ccclass("init")
export class init extends Component {
  start() {
    const editBox = this.node.getComponent(EditBox);
    if (editBox) {
      editBox.node.on(
        "text-changed",
        (event) => {
          console.log("init：", event._string);
        },
        this
      );
      editBox.node.on(
        "editing-did-ended",
        (event) => {
          DataTower.init(JSON.parse(event._string));
          console.log("submit init：", event._string);
        },
        this
      );
    }
  }

  update(deltaTime: number) {}
}
