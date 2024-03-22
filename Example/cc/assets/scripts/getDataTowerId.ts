import { _decorator, Button, Component, Label } from "cc";
import * as DataTower from "../libs/index.mjs";

const { ccclass, property } = _decorator;

@ccclass("getDataTowerId")
export class getDataTowerId extends Component {
  start() {
    const button = this.node.getComponent(Button);
    if (button) {
      button.node.on("click", this.onButtonClick, this);
    }
  }

  update(deltaTime: number) {}

  onButtonClick() {
    DataTower.getDataTowerId((id) => {
      const button = this.node.getComponent(Button);
      if (button) {
        // 获取按钮的标签组件
        const label = button.node.getChildByName("Label").getComponent(Label);
        if (label) {
          // 设置按钮标签的文本内容
          label.string = "getDataTowerId：" + id;
        }
      }
      console.log("getDataTowerId：", id);
    });
  }
}
