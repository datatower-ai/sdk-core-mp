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

type CCPlatform = 'ANDROID' | 'IOS' | 'WEB';

interface JSB {
  reflection: {
    callStaticMethod: ((className: string, methodName: string, ...args: any[]) => void) &
      ((className: string, methodName: string, signature: string, ...args: any[]) => void);
  };
}

declare var cc: CC;
declare var jsb: JSB;

declare var wx: any;
declare var qq: any;
declare var swan: any;
declare var tt: any;
declare var my: any;
declare var qh: any;
declare var dd: any;
declare var bl: any;
declare var ks: any;
declare var jd: any;
