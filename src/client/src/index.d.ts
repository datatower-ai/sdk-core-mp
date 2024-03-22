interface CC {
  sys: {
    os: 'iOS' | 'Android';
    isNative: boolean;
    isNativeIOS: boolean;
    isNativeAndroid: boolean;
    platform: number;

    WECHAT_GAME: number;
    BAIDU_GAME: number;
    OPPO_GAME: number;
    VIVO_GAME: number;
    QQ_PLAY: number;
    FB_PLAYABLE_ADS: number;
    TT_GAME: number;
    XIAOMI_GAME: number;
    HUAWEI_GAME: number;
    ALIPAY_GAME: number;
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
