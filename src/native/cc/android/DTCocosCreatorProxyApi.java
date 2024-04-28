package ai.datatower.bridge;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.lang.reflect.Method;
import java.lang.reflect.InvocationTargetException;
import java.util.function.Function;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.os.Looper;

import android.util.Log;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import ai.datatower.ad.AdMediation;
import ai.datatower.ad.AdPlatform;
import ai.datatower.ad.AdType;
import ai.datatower.ad.DTAdReport;
import ai.datatower.analytics.DT;
import ai.datatower.analytics.DTAnalytics;
import ai.datatower.analytics.DTAnalyticsUtils;
import ai.datatower.analytics.OnDataTowerIdListener;
import ai.datatower.iap.DTIAPReport;
import ai.datatower.ias.DTIASReport;

public class DTCocosCreatorProxyApi {

    private static String sConfig = null;

    @TargetApi(Build.VERSION_CODES.KITKAT)
    public static Context getCocosContext() {
        Class<?> sdkWrapper = null;
        Class<?> cocos2dxActivity = null;
        try {
            sdkWrapper = Class.forName("com.cocos.service.SDKWrapper");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        if (sdkWrapper == null) {
            try {
                cocos2dxActivity = Class.forName("org.cocos2dx.lib.Cocos2dxActivity");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            if (cocos2dxActivity == null) {
                return null;
            } else {
                try {
                    Method methodGetContext = cocos2dxActivity.getMethod("getContext");
                    return (Context) methodGetContext.invoke(null);
                } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        } else {
            try {
                Method methodShared = sdkWrapper.getMethod("shared");
                Object instance = methodShared.invoke(null);
                if (instance != null) {
                    Method methodGetActivity = sdkWrapper.getMethod("getActivity");
                    return (Activity) methodGetActivity.invoke(instance);
                }
            } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public static void initSDK(String config) {
        sConfig = config;
        JSONObject configDic = stringToJSONObject(config);
        String appId = configDic.optString("appId");
        String serverUrl = configDic.optString("serverUrl");
        boolean isDebug = configDic.optBoolean("isDebug", false);
        String channel = configDic.optString("channel", "");
        int logLevel = configDic.optInt("logLevel", 2);
        boolean manualEnableUpload = configDic.optBoolean("manualEnableUpload", false);
        JSONObject properties = configDic.optJSONObject("properties");
        Context mAppContext = getCocosContext();

        DT.initSDK(
                mAppContext,
                appId,
                serverUrl,
                channel,
                isDebug,
                logLevel,
                manualEnableUpload,
                properties == null? new JSONObject() : properties
        );
    }

    public static void track(String eventName, String properties) {
        if (eventName == null) {
            return;
        }

        JSONObject jsonObj = stringToJSONObject(properties);
        DTAnalytics.track(eventName, jsonObj);
    }

    public static void enableUpload() {
        DT.enableUpload();
    }

    public static void userSet(String properties) {
        DTAnalytics.userSet(stringToJSONObject(properties));
    }

    public static void userAdd(String properties) {
        DTAnalytics.userAdd(stringToJSONObject(properties));
    }

    public static void userSetOnce(String properties) {
        DTAnalytics.userSetOnce(stringToJSONObject(properties));
    }

    public static void userUnset(String properties) {
        try {
            JSONArray json = new JSONArray(properties);
            if (json.length() > 0) {
                int length = json.length();
                ArrayList<String> arr = new ArrayList<>(length);
                for (int i = 0; i < length; i++) {
                    String value =  json.optString(i);
                    if (!value.isEmpty()) {
                        arr.add(value);
                    }
                }
                DTAnalytics.userUnset(arr.toArray(new String[0]));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static void userDelete() {
        DTAnalytics.userDelete();
    }

    public static void userAppend(String properties) {
        DTAnalytics.userAppend(stringToJSONObject(properties));
    }

    public static void userUniqAppend(String properties) {
        DTAnalytics.userUniqAppend(stringToJSONObject(properties));
    }

    public static void getDataTowerId(String callback) {
        DTAnalytics.getDataTowerId((id) ->
                CocosHelper.runOnGameThread(() ->
                        CocosJavascriptJavaBridge.evalString(callback + "(\"" + id + "\")")
                )
        );
    }

    public static void setAccountId(String id) {
        DTAnalytics.setAccountId(id);
    }

    public static void setFirebaseAppInstanceId(String id) {
        DTAnalytics.setFirebaseAppInstanceId(id);
    }

    public static void setAppsFlyerId(String id) {
        DTAnalytics.setAppsFlyerId(id);
    }

    public static void setKochavaId(String id) {
        DTAnalytics.setKochavaId(id);
    }

    public static void setAdjustId(String id) {
        DTAnalytics.setAdjustId(id);
    }

    public static void setStaticCommonProperties(String properties) {
        DTAnalytics.setStaticCommonProperties(stringToJSONObject(properties));
    }

    public static void clearStaticCommonProperties() {
        DTAnalytics.clearStaticCommonProperties();
    }

    // Timer
    public static void trackTimerStart(String eventName) {
        DTAnalyticsUtils.trackTimerStart(eventName);
    }

    public static void trackTimerPause(String eventName) {
        DTAnalyticsUtils.trackTimerPause(eventName);
    }

    public static void trackTimerResume(String eventName) {
        DTAnalyticsUtils.trackTimerResume(eventName);
    }

    public static void trackTimerEnd(String eventName, String properties) {
        DTAnalyticsUtils.trackTimerEnd(eventName, stringToJSONObject(properties));
    }

    // Ad
    public static void reportLoadBegin(
            String id, int type, int platform, String seq, String properties,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportLoadBegin(
                id, getAdType(type), getAdPlatform(platform), seq,
                jsonObjectToMap(stringToJSONObject(properties)), getAdMediation(mediation),
                mediationId
        );
    }

    public static void reportLoadEnd(
            String id, int type, int platform, float duration, boolean result, String seq,
            int errorCode /* 0 */, String errorMessage /* "" */, String properties /* {} */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportLoadEnd(
                id, getAdType(type), getAdPlatform(platform), (long) duration, result, seq,
                errorCode, errorMessage, jsonObjectToMap(stringToJSONObject(properties)),
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportToShow(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportToShow(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportShow(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportShow(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportShowFailed(
            String id, int type, int platform, String location, String seq,
            int errorCode, String errorMessage, String properties /* {} */,
            String entrance /* "" */, int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportShowFailed(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                errorCode, errorMessage, jsonObjectToMap(stringToJSONObject(properties)),
                entrance, getAdMediation(mediation), mediationId
        );
    }

    public static void reportClose(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportClose(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportClick(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportClose(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportRewarded(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportClose(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportConversionByClick(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportConversionByClick(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportConversionByLeftApp(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportConversionByClick(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportConversionByRewarded(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportConversionByClick(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportPaid(
            String id, int type, int platform, String location, String seq,
            float value, String currency, String precision,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportPaid(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                value, currency, precision,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    public static void reportPaid(
            String id, int type, int platform, String location, String seq,
            int mediation, String mediationId,
            float value, String precision, String country,
            String properties /* {} */
    ) {
        DTAdReport.reportPaid(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                getAdMediation(mediation), mediationId,
                value, precision, country,
                jsonObjectToMap(stringToJSONObject(properties))
        );
    }

    public static void reportLeftApp(
            String id, int type, int platform, String location, String seq,
            String properties /* {} */, String entrance /* "" */,
            int mediation /* -1 */, String mediationId /* "" */
    ) {
        DTAdReport.reportLeftApp(
                id, getAdType(type), getAdPlatform(platform), location, seq,
                jsonObjectToMap(stringToJSONObject(properties)), entrance,
                getAdMediation(mediation), mediationId
        );
    }

    // IAP
    public static void reportPurchaseSuccess(
            String order, String sku, float price, String currency,
            String properties /* {} */
    ) {
        DTIAPReport.reportPurchaseSuccess(
                order, sku, price, currency, jsonObjectToMap(stringToJSONObject(properties))
        );
    }

    // IAS
    public static void reportSubscribeSuccess(
            String originalOrderId, String orderId, String sku, float price, String currency,
            String properties /* {} */
    ) {
        DTIASReport.reportSubscribeSuccess(
                originalOrderId, orderId, sku, price, currency,
                jsonObjectToMap(stringToJSONObject(properties))
        );
    }

    // Util
    private static JSONObject stringToJSONObject(String str) {
        if (str != null && !str.isEmpty()) {
            try {
                return new JSONObject(str);
            }
            catch (JSONException e) {
                e.printStackTrace();
                return new JSONObject();
            }
        }
        else  {
            return new JSONObject();
        }
    }

    private static Map<String, Object> jsonObjectToMap(JSONObject jsonObj) {
        HashMap<String, Object> result = new HashMap<>();
        Iterator<String> keys = jsonObj.keys();
        while (keys.hasNext()) {
            try {
                String key = keys.next();
                Object value = jsonObj.get(key);
                if (value instanceof JSONArray) {
                    value = jsonArrayToList((JSONArray) value);
                } else if (value instanceof JSONObject) {
                    value = jsonObjectToMap((JSONObject) value);
                }
                result.put(key, value);
            } catch (Throwable t) {
                // never gonna getting here.
                t.printStackTrace();
            }
        }
        return result;
    }

    private static List<Object> jsonArrayToList(JSONArray jsonArr) {
        List<Object> result = new ArrayList<>();
        for (int i = 0; i < jsonArr.length(); ++i) {
            try {
                Object value = jsonArr.get(i);
                if (value instanceof JSONArray) {
                    value = jsonArrayToList((JSONArray) value);
                } else if (value instanceof JSONObject) {
                    value = jsonObjectToMap((JSONObject) value);
                }
                result.add(value);
            } catch (Throwable t) {
                // never gonna getting here.
                t.printStackTrace();
            }
        }
        return result;
    }

    private volatile static Map<Integer, AdType> adTypeMap;
    private static AdType getAdType(int id) {
        if (adTypeMap == null) {
            synchronized (DTCocosCreatorProxyApi.class) {
                if (adTypeMap == null) {
                    adTypeMap = new HashMap<>();
                    AdType[] values = AdType.values();
                    for (AdType item: values) {
                        adTypeMap.put(item.getValue(), item);
                    }
                }
            }
        }
        AdType item = adTypeMap.get(id);
        return item != null? item : AdType.IDLE;
    }

    private volatile static Map<Integer, AdPlatform> adPlatformMap;
    private static AdPlatform getAdPlatform(int id) {
        if (adPlatformMap == null) {
            synchronized (DTCocosCreatorProxyApi.class) {
                if (adPlatformMap == null) {
                    adPlatformMap = new HashMap<>();
                    AdPlatform[] values = AdPlatform.values();
                    for (AdPlatform item: values) {
                        adPlatformMap.put(item.getValue(), item);
                    }
                }
            }
        }
        AdPlatform item = adPlatformMap.get(id);
        return item != null? item : AdPlatform.IDLE;
    }

    private volatile static Map<Integer, AdMediation> adMediationMap;
    private static AdMediation getAdMediation(int id) {
        if (adMediationMap == null) {
            synchronized (DTCocosCreatorProxyApi.class) {
                if (adMediationMap == null) {
                    adMediationMap = new HashMap<>();
                    AdMediation[] values = AdMediation.values();
                    for (AdMediation item: values) {
                        adMediationMap.put(item.getValue(), item);
                    }
                }
            }
        }
        AdMediation item = adMediationMap.get(id);
        return item != null? item : AdMediation.IDLE;
    }
}
