package ai.datatower.bridge;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

import ai.datatower.analytics.DT;
import ai.datatower.analytics.DTAnalytics;
import ai.datatower.analytics.OnDataTowerIdListener;

public class DTCocosCreatorProxyApi {

    private static String sConfig = null;

    private static String sDefaultAppId = null;
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

    public static void initSDK (String config) {
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

    public static void track (String eventName, String properties) {
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
}
