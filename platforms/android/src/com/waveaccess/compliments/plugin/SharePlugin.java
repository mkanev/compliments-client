package com.waveaccess.compliments.plugin;

import com.google.analytics.tracking.android.EasyTracker;
import com.google.analytics.tracking.android.MapBuilder;

import android.app.Activity;
import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * @author <a href="mailto:maksim.kanev@waveaccess.ru">Maksim Kanev</a>
 */
public class SharePlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        return "share".equals(action) && share(args.getString(0));

    }

    private boolean share(String message) {
        Activity activity = cordova.getActivity();
        Intent sharingIntent = new Intent(Intent.ACTION_SEND);
        sharingIntent.setType("text/plain");
        sharingIntent.putExtra(Intent.EXTRA_TEXT, message);
        activity.startActivity(Intent.createChooser(sharingIntent, "Share via"));
        EasyTracker.getInstance(activity).send(MapBuilder.createEvent(
            "share",     // Event category (required)
            "compliment_send",  // Event action (required)
            "share_btn",   // Event label
            null
        ).build());
        return true;
    }
}
