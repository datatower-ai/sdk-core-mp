/**
 * @file platform.d.ts
 * 各个平台的全局变量声明
 */
interface CC {
  sys: {
    os: 'iOS' | 'Android';
    isNative: boolean;
    isNativeIOS: boolean;
    isNativeAndroid: boolean;
    platform: number;
    Platform: Record<CCPlatform, number>;
    OS_ANDROIRD: 'Android';
    OS_IOS: 'iOS';
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

declare var uni: any;
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

declare interface XDomainRequest extends XMLHttpRequest {
  new (): XDomainRequest;
}
declare interface ActiveXObject extends XMLHttpRequest {
  new (type: string): ActiveXObject;
}
declare var XDomainRequest: XDomainRequest?;
declare var ActiveXObject: ActiveXObject?;
