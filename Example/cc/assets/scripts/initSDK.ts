import { Button, Component, EditBox, _decorator } from 'cc';
import { DataTower } from '@datatower-ai/sdk-core-js/cocos.mjs';

const { ccclass } = _decorator;

@ccclass('initSDK')
export class initSDK extends Component {
  start() {
    const editBox = this.node.getComponentInChildren(EditBox);
    editBox.maxLength = -1;
    editBox.string = `{"appId":"dt_0e3fa14f6d26b302","serverUrl":"http://localhost:3000/report","channel":"","isDebug":true,"logLevel":1,"manualEnableUpload":false}`;

    const submit = () => {
      console.log(editBox.string);
      const data = JSON.parse(editBox.string);
      DataTower.initSDK(data);
    };
    const button = this.node.getComponentInChildren(Button);
    button.node.on('click', submit, this);
  }
}
