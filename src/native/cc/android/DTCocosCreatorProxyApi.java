package ai.datatower.bridge;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.lang.reflect.Method;
import java.lang.reflect.InvocationTargetException;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.os.Looper;

//import com.cocos.lib.CocosJavascriptJavaBridge;

import org.json.JSONException;
import org.json.JSONObject;

import ai.datatower.analytics.DT;
import ai.datatower.analytics.DTAnalytics;

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
        boolean isDebug = configDic.optBoolean("isDebug");
        int channel = configDic.optInt("channel");
        int logLevel = configDic.optInt("logLevel");
        Context mAppContext = getCocosContext();

        DT.initSDK(
                mAppContext,
                appId,
                serverUrl,
                channel.ToString(),
                isDebug,
                logLevel
        );
    }

    public static void track (String eventName, String properties) {
        if (eventName == null) {
            return;
        }

        JSONObject jsonObj = stringToJSONObject(properties);
        DTAnalytics.track(eventName, jsonObj);
    }

    public static String getDeviceId (String appId)  {

    }

    private static JSONObject stringToJSONObject (String str) {
        if (str != null && str.length() > 0) {
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
