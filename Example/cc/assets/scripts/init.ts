import { Button, Component, EditBox, _decorator } from "cc";
import { DataTower } from "../libs/dt.cc.mjs";

const { ccclass } = _decorator;

@ccclass("init")
export class init extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"appId":"dt_0e3fa14f6d26b302","serverUrl":"https://test.roiquery.com","channel":"","isDebug":true,"logLevel":1,"manualEnableUpload":false,"properties":{"#sdk_type":"","#sdk_version_name":""}}`;

    const submit = () => {
      console.log(editBox.string);
      const data = JSON.parse(editBox.string);
      DataTower.init(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on("click", submit, this);
  }
}
