//
//  CocosCreatorProxyApi.m
//  NewProject-mobile
//
//  Created by huangdiao on 2021/7/20.
//

#define ImportSource

#ifdef ImportSource

#import "DTAnalytics.h"
#import "DT.h"
#import "DTAnalyticsUtils.h"
#import "DTAdReport.h"
#import "DTIAPReport.h"
#import "DTIASReport.h"

#else

#import <DataTowerAICore/DTAnalytics.h>
#import <DataTowerAICore/DT.h>
#import <DataTowerAICore/DTAnalyticsUtils.h>
#import <DataTowerAICore/DTAdReport.h>
#import <DataTowerAICore/DTIAPReport.h>
#import <DataTowerAICore/DTIASReport.h>

#endif

#import "DTCocosCreatorProxyApi.h"

//#include "platform/apple/JsbBridge.h"
//#include "bindings/sebind/sebind.h"
//#include "platform/apple/JsbBridgeWrapper.h"
#include "application/ApplicationManager.h"

#if __has_include("cocos/bindings/jswrapper/SeApi.h")
#include "cocos/bindings/jswrapper/SeApi.h"
#endif
#if __has_include("cocos/scripting/js-bindings/jswrapper/SeApi.h")
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#endif
using namespace std;

#define IsNullOrEmpty(s) (s == nil || s.length == 0) ? YES : NO

NS_ENUM(NSInteger, MPLogLevel)
{
    DEFAULT = 2,
    VERBOSE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
    ASSERT = 7
};

DTLoggingLevel convertUnityLogLevel(enum MPLogLevel level) {
    DTLoggingLevel ret = DTLoggingLevelError;
    if (level <= DEBUG) {
        ret = DTLoggingLevelDebug;
    } else if (level <= INFO) {
        ret = DTLoggingLevelInfo;
    }
    return ret;
}

@interface NSString (JSON)
- (NSDictionary *)jsonDictionary;
@end
@implementation NSString (JSON)
- (NSDictionary *)jsonDictionary {
    if (self == nil) {
        return @{};
    } else {
        NSData *data = [self dataUsingEncoding:NSUTF8StringEncoding];
        NSError *error = nil;
        NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&error];
        if (error == nil) {
            return json;
        } else {
#ifdef DEBUG
            NSLog(@"Json parse error：%@, Json=%@", error.description, self);
#endif
            return @{};
        }
    }
}
@end

@interface NSDictionary (SafeMode)
- (id)smValueForKey:(NSString *)key;
@end
@implementation NSDictionary (SafeMode)
- (id)smValueForKey:(NSString *)key {
    if (key!=nil) {
        return [self valueForKey:key];
    } else {
        return nil;
    }
}
@end

@implementation DTCocosCreatorProxyApi

+ (void)initSDK:(NSString *)config {
    NSDictionary *configDict = [config jsonDictionary];
    NSString *appId = configDict[@"appId"];
    NSString *serverUrl = configDict[@"serverUrl"];
    int logLevel = [configDict[@"logLevel"] intValue];
    NSString *jsonStr = configDict[@"commonProperties"];
    BOOL isDebug = [configDict[@"isDebug"] boolValue];
    BOOL manualEnableUpload =  [configDict[@"manualEnableUpload"] boolValue];
    BOOL enableUpload = !manualEnableUpload;

    DTLoggingLevel iOSLogLevel = convertUnityLogLevel((enum MPLogLevel)logLevel);
    
    if (jsonStr != NULL) {
        NSDictionary *props = [jsonStr jsonDictionary];
        [DT initSDK:appId serverUrl:serverUrl channel:DTChannelAppStore isDebug:isDebug logLevel:iOSLogLevel commonProperties:props enableTrack:enableUpload];
    } else {
        [DT initSDK:appId serverUrl:serverUrl channel:DTChannelAppStore isDebug:isDebug logLevel:iOSLogLevel enableTrack:enableUpload];
    }
}

+ (void)getDataTowerId:(NSString *)methodName {
    NSString *result = [DTAnalytics getDataTowerId];
    [DTCocosCreatorProxyApi callJSMethod:methodName arg1:result];
}

+ (void)track:(NSString *)eventName properties:(NSString *)jsonStr {
    NSDictionary *dictParam = [jsonStr jsonDictionary];
    [DTAnalytics trackEventName:eventName properties:dictParam];
}

+ (void)enableUpload {
    [DTAnalytics setEnableTracking:YES];
}

+ (void)userSet:(NSString *)jsonStr {
    NSDictionary *dict = [jsonStr jsonDictionary];
    [DTAnalytics userSet:dict];
}

+ (void)userSetOnce:(NSString *)jsonStr {
    NSDictionary *dict = [jsonStr jsonDictionary];
    [DTAnalytics userSetOnce:dict];
}

+ (void)userAdd:(NSString *)jsonStr {
    NSDictionary *dict = [jsonStr jsonDictionary];
    [DTAnalytics userAdd:dict];
}

+ (void)userUnset:(NSString *)str {
    [DTAnalytics userUnset:str];
}

+ (void)userDelete {
    [DTAnalytics userDelete];
}

+ (void)userAppend:(NSString *)jsonStr {
    NSDictionary *dict = [jsonStr jsonDictionary];
    [DTAnalytics userAppend:dict];
}

+ (void)userUniqAppend:(NSString *)jsonStr {
    NSDictionary *dict = [jsonStr jsonDictionary];
    [DTAnalytics userUniqAppend:dict];
}

+ (void)setAccountId:(NSString *)acctId {
    [DTAnalytics setAccountId:acctId];
}

+ (void)setDistinctId:(NSString *)acctId {
    [DTAnalytics setDistinctId:acctId];
}

+ (void)getDistinctId:(NSString *)cb {
    NSString *result = [DTAnalytics getDistinctId];
    [DTCocosCreatorProxyApi callJSMethod:cb arg1:result];
}

+ (void)setFirebaseAppInstanceId:(NSString *)fireId {
    [DTAnalytics setFirebaseAppInstanceId:fireId];
}

+ (void)setAppsFlyerId:(NSString *)fireId {
    [DTAnalytics setAppsFlyerId:fireId];
}

+ (void)setKochavaId:(NSString *)fireId {
    [DTAnalytics setKochavaId:fireId];
}

+ (void)setAdjustId:(NSString *)fireId {
    [DTAnalytics setAdjustId:fireId];
}

+ (void)setStaticCommonProperties:(NSString *)jsonStr {
    [DTAnalytics setSuperProperties:[jsonStr jsonDictionary]];
}

+ (void)clearStaticCommonProperties {
    [DTAnalytics setSuperProperties:nil];
}

+ (void)trackTimerStart:(NSString *)eventName {
    [DTAnalyticsUtils trackTimerStart:eventName];
}

+ (void)trackTimerPause:(NSString *)eventName {
    [DTAnalyticsUtils trackTimerPause:eventName];
}

+ (void)trackTimerResume:(NSString *)eventName {
    [DTAnalyticsUtils trackTimerResume:eventName];
}

+ (void)trackTimerEnd:(NSString *)eventName  properties:(NSString *)jsonStr {
    [DTAnalyticsUtils trackTimerEnd:eventName properties:[jsonStr jsonDictionary]];
}

+ (void)reportLoadBegin:(NSString *)jsonStr
{
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
//    NSString *location = param[@"location"];
//    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportLoadBegin:adid type:adType platform:platform seq:seq mediation:adMedia mediationId:admediaId properties:properties];
}

+ (void)reportLoadEnd:(NSString *)jsonStr {
    
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSNumber *duration = param[@"duration"];
    BOOL result = [param[@"result"] boolValue];
    NSInteger errorCode = [param[@"errorCode"] intValue];
    NSString *errorMsg = param[@"errorMessage"];
    
//    NSString *location = param[@"location"];
//    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportLoadEnd:adid type:adType platform:platform duration:duration result:result seq:seq mediation:adMedia mediationId:admediaId errorCode:errorCode errorMessage:errorMsg properties:properties];
}

+ (void)reportToShow:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportToShow:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportShow:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportShow:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)callJSMethod:(NSString *)selector arg1:(NSString *)arg1 {
//    JsbBridge* m = [JsbBridge sharedInstance];
//    [m sendToScript:selector arg1:arg1];
    
    NSString *script = [NSString stringWithFormat:@"%@(\"%@\")", selector, arg1];
    std::string *string = new std::string([script UTF8String]);
    CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
        se::ScriptEngine::getInstance()->evalString(string->c_str());
        delete string;
    });
}

+ (void)reportShowFailed:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    NSInteger errorCode = [param[@"errorCode"] intValue];
    NSString *errorMsg = param[@"errorMessage"];
    
    [DTAdReport reportAdShowFail:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId errorCode:errorCode errorMessage:errorMsg properties:properties entrance:entrance];
}

+ (void)reportClose:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportClose:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportClick:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportClick:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportRewarded:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportRewarded:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportConversionByClick:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportConversionByClick:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportConversionByLeftApp:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportConversionByLeftApp:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportConversionByRewarded:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    [DTAdReport reportConversionByRewarded:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportPaid:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
    
    double value = [param[@"value"] doubleValue];
    NSString *precision = param[@"precision"];
    NSString *country = param[@"country"];
    
    if(param[@"currency"])
    {
        NSString *currency = param[@"currency"];
        [DTAdReport reportPaid:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId value:value currency:currency precision:precision properties:properties entrance:entrance];
    }
    else {
        [DTAdReport reportPaid:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId value:value precision:precision country:country properties:properties entrance:entrance];
    }
}

+ (void)reportLeftApp:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *adid = param[@"id"];
    DTAdPlatform platform = (DTAdPlatform)[param[@"platform"] intValue];
    DTAdType adType = (DTAdType)[param[@"type"] intValue];
    DTAdMediation adMedia = (DTAdMediation)[param[@"mediation"] intValue];
    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    NSString *admediaId = param[@"mediationId"];
    
    NSString *location = param[@"location"];
    NSString *entrance = param[@"entrance"];
        
    [DTAdReport reportLeftApp:adid type:adType platform:platform location:location seq:seq mediation:adMedia mediationId:admediaId properties:properties entrance:entrance];
}

+ (void)reportPurchaseSuccess:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *order = param[@"order"];
    NSString *seq = param[@"seq"];
//    NSDictionary *properties = param[@"properties"];
    
    NSString *sku = param[@"sku"];
//    NSString *entrance = param[@"entrance"];
    
    NSNumber *price = param[@"price"];
    NSString *currency = param[@"currency"];
    NSString *placement = param[@"placement"];
    
    [DTIAPReport reportPurchased:order sku:sku price:price currency:currency seq:seq placement:placement];
}

+ (void)reportSubscribeSuccess:(NSString *)jsonStr {
    NSDictionary *param = [jsonStr jsonDictionary];
    NSString *order = param[@"orderId"];
    NSString *originalOrderId = param[@"originalOrderId"];

    NSString *seq = param[@"seq"];
    NSDictionary *properties = param[@"properties"];
    
    NSString *sku = param[@"sku"];
    NSString *entrance = param[@"entrance"];
    
    NSString *price = param[@"price"];
    NSString *currency = param[@"currency"];
    NSString *placement = param[@"placement"];
    
    [DTIASReport reportSubscribeSuccess:seq entrance:entrance placement:placement sku:sku orderId:order originalOrderId:originalOrderId price:price currency:currency properties:properties];
}

@end
