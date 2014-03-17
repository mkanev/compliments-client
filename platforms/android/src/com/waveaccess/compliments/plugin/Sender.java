package com.waveaccess.compliments.plugin;

import com.google.analytics.tracking.android.EasyTracker;
import com.google.analytics.tracking.android.MapBuilder;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * @author <a href="mailto:maksim.kanev@waveaccess.ru">Maksim Kanev</a>
 */
public class Sender extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (!"sms".equals(action)) {
            return false;
        }
        String message = args.getString(0);
        String number = args.getString(1);
        this.sendSMS(number, message);
        return true;
    }

    private void sendSMS(String phoneNumber, String message) {
        Activity activity = cordova.getActivity();
        activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("sms:" + phoneNumber + "?body=" + message)));
        EasyTracker.getInstance(activity).send(MapBuilder.createEvent(
            "share",     // Event category (required)
            "short_message_send",  // Event action (required)
            "sms_btn",   // Event label
            null
        ).build());
    }
}