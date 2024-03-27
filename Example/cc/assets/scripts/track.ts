import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("track")
export class track extends Component {
  start() {
    const _eventName = this.node
      .getChildByName("eventName")
      .getComponent(EditBox);
    _eventName.maxLength = -1;

    const _properties = this.node
      .getChildByName("properties")
      .getComponent(EditBox);
    _properties.maxLength = -1;

    const submit = () => {
      const eventName = _eventName.string;
      const properties = JSON.parse(_properties.string);
      DataTower.track(eventName, properties);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
