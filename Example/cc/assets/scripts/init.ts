import { Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt-sdk/index.mjs";

const { ccclass, property } = _decorator;

@ccclass("init")
export class init extends Component {
  start() {
    const editBox = this.node.getComponent(EditBox);
    editBox.maxLength = -1;
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
          const data = JSON.parse(event._string);
          DataTower.init(data);
          console.log("submit init：", event._string);
        },
        this
      );
    }
  }

  update(deltaTime: number) {}
}
