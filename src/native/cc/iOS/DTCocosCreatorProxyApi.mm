//
//  CocosCreatorProxyApi.m
//  NewProject-mobile
//
//  Created by huangdiao on 2021/7/20.
//

#import "DTCocosCreatorProxyApi.h"
#import <DataTowerAICore/DTAnalytics.h>
#import <DataTowerAICore/DT.h>
#import <DataTowerAICore/DTAnalyticsUtils.h>
#include "platform/apple/JsbBridge.h"

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

    DTLoggingLevel iOSLogLevel = convertUnityLogLevel((enum MPLogLevel)logLevel);
    
    if (jsonStr != NULL) {
        NSDictionary *props = [jsonStr jsonDictionary];
        [DT initSDK:appId serverUrl:serverUrl channel:DTChannelAppStore isDebug:isDebug logLevel:iOSLogLevel commonProperties:props];
    } else {
        [DT initSDK:appId serverUrl:serverUrl channel:DTChannelAppStore isDebug:isDebug logLevel:iOSLogLevel];
    }
}

+ (void)getDataTowerId {
    NSString *result = [DTAnalytics getDataTowerId];
    [DTCocosCreatorProxyApi callJSMethod:@"onDatatowerId" arg1:result];
}

+ (void)trackEvent:(NSString *)eventName properties:(NSString *)jsonStr {
    NSDictionary *dictParam = [jsonStr jsonDictionary];
    [DTAnalytics trackEventName:eventName properties:dictParam];
}

+ (void)callJSMethod:(NSString *)selector arg1:(NSString *)arg1 {
    JsbBridge* m = [JsbBridge sharedInstance];
    [m sendToScript:selector arg1:arg1];
}

@end
