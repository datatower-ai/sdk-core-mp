import { Component, EditBox, _decorator, sys } from "cc";
import { Config, DataTower, LogLevel } from "../libs/dt.cc.mjs";
import { native } from 'cc'

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
          // const data = JSON.parse(event._string);

          var config: Config = {
            appId: "dt_beb231f90a5a20ba",
            serverUrl: "https://test.roiquery.com",
            isDebug: true,
            logLevel: LogLevel.DEBUG,
            context: {},
            channel: "",
            manualEnableUpload: true,
            commonProperties: undefined
          }

          console.log("lilinli invoke DataTower.init(config)");
          DataTower.init(config);

          console.log("submit init：", event._string);
        },
        this
      );

      if (sys.platform == sys.Platform.IOS || sys.platform == sys.Platform.ANDROID) {
        native.bridge.onNative = (arg0: string, arg1: string): void => {
          console.log("lilinli on native call method is " + arg0 + " arg1 is " + arg1);
          editBox.placeholderLabel.string = "onCall";
          editBox.placeholderLabel.string = arg1;
          return;
        }
      }
    }
  }

  update(deltaTime: number) { }
}
