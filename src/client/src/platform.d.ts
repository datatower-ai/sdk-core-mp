interface CC {
  sys: {
    os: 'iOS' | 'Android';
    isNative: boolean;
    isNativeIOS: boolean;
    isNativeAndroid: boolean;
    platform: number;
    Platform: Record<CCPlatform, number>;
  };
}

type CCPlatform =
  | 'ANDROID'
  | 'IOS'
  | 'WEB'
  | 'WECHAT_GAME'
  | 'BAIDU_GAME'
  | 'OPPO_GAME'
  | 'VIVO_GAME'
  | 'QQ_PLAY'
  | 'FB_PLAYABLE_ADS'
  | 'TT_GAME'
  | 'XIAOMI_GAME'
  | 'HUAWEI_GAME'
  | 'ALIPAY_GAME';

interface JSB {
  reflection: {
    callStaticMethod: ((className: string, methodName: string, ...args: any[]) => void) &
      ((className: string, methodName: string, signature: string, ...args: any[]) => void);
  };
}

declare var cc: CC;
declare var jsb: JSB;
