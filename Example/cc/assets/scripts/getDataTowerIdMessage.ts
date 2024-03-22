import { _decorator, Component, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("getDataTowerIdMessage")
export class getDataTowerIdMessage extends Component {
  @property(Label)
  message: Label = null; // 吐司中显示消息的文本标签组件

  @property
  duration: number = 10; // 吐司显示时长（单位：秒）
  // 显示吐司，并设置消息内容
  showToast(message) {
    this.message.string = message;
    this.node.active = true; // 显示吐司节点
    this.scheduleOnce(() => {
      this.node.active = false; // 自动隐藏吐司节点
    }, this.duration);
  }
  start() {
    this.message = this.node.getComponent(Label);
  }

  update(deltaTime: number) {}
}
