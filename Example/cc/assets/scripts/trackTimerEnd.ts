import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "@datatower-ai/sdk-core-js/cocos.mjs";

const { ccclass } = _decorator;

@ccclass("trackTimerEnd")
export class trackTimerEnd extends Component {
  start() {
    const _eventName = this.node
      .getChildByName("eventName")
      .getComponent(EditBox);
    _eventName.maxLength = -1;
    _eventName.string = "eventName";

    const _properties = this.node
      .getChildByName("properties")
      .getComponent(EditBox);
    _properties.maxLength = -1;
    _properties.string = `{"key":"boolean,string,number"}`;

    const submit = () => {
      console.log(_properties.string);
      const eventName = _eventName.string;
      const properties = JSON.parse(_properties.string);
      DataTower.trackTimerEnd(eventName, properties);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
