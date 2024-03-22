interface CC {
  sys: {
    os: 'iOS' | 'Android';
    isNative: boolean;
    isNativeIOS: boolean;
    isNativeAndroid: boolean;
    platform: number;
    Platform: {
      ANDROID: 1;
      IOS: 2;
      WEB: 3;
      WECHAT_GAME: 4;
      BAIDU_GAME: 5;
      OPPO_GAME: 6;
      VIVO_GAME: 7;
      QQ_PLAY: 8;
      FB_PLAYABLE_ADS: 9;
      TT_GAME: 10;
      XIAOMI_GAME: 11;
      HUAWEI_GAME: 12;
      ALIPAY_GAME: 13;
    };
  };
}

interface JSB {
  reflection: {
    callStaticMethod: ((className: string, methodName: string, ...args: any[]) => void) &
      ((className: string, methodName: string, signature: string, ...args: any[]) => void);
  };
}

declare var cc: CC;
declare var jsb: JSB;
