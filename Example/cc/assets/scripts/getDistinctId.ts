import { _decorator, Button, Component } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("getDistinctId")
export class getDistinctId extends Component {
  start() {
    const button = this.node.getComponent(Button);
    button.node.on(
      "click",
      async () => {
        const id = await DataTower.getDistinctId();
        console.log("getDistinctId response：", id);
      },
      this
    );
  }
}
