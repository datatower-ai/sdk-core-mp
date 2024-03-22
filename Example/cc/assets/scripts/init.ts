import { Component, EditBox, _decorator } from "cc";
import * as DataTower from "../libs/index.mjs";
import { LogLevel } from "../libs/index.mjs";

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
          // DataTower.init(JSON.parse(event._string));
          var config: DataTower.Config = {
            appId: "dt_beb231f90a5a20ba",
            serverUrl: "https://test.roiquery.com",
            isDebug: true,
            logLevel: LogLevel.DEBUG,
            context: {},
            channel: "",
            manualEnableUpload: true,
            commonProperties: undefined
          }

          DataTower.init(config);
          // console.log("submit init：", event._string);
        },
        this
      );
    }
  }

  update(deltaTime: number) { }
}
