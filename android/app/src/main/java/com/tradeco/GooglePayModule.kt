package com.tradeco

import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.annotation.NonNull
import com.facebook.react.bridge.*

class GooglePayModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var promise: Promise? = null
    private val GOOGLE_PAY_PACKAGE_NAME = "com.google.android.apps.nbu.paisa.user"
    private val GOOGLE_PAY_REQUEST_CODE = 123

    init {
        reactContext.addActivityEventListener(this)
    }

    @NonNull
    override fun getName(): String {
        return "GooglePay"
    }

    @ReactMethod
    fun startGooglePay(merchantVPA: String, merchantName: String, merchantCode: String, transactionId: String,
                       transactionNote: String, orderAmount: String, transactionUrl: String, promise: Promise) {
        val activity: Activity? = currentActivity

        if (activity == null) {
            promise.reject("Activity doesn't exist")
            return
        }

        this.promise = promise

        // Build the UPI payment URI
        val uri = Uri.Builder()
            .scheme("upi")
            .authority("pay")
            .appendQueryParameter("pa", merchantVPA)
            .appendQueryParameter("pn", merchantName)
            .appendQueryParameter("mc", merchantCode)
            .appendQueryParameter("tr", transactionId)
            .appendQueryParameter("tn", transactionNote)
            .appendQueryParameter("am", orderAmount)
            .appendQueryParameter("cu", "INR")
            .appendQueryParameter("url", transactionUrl)
            .build()

        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = uri
        intent.setPackage(GOOGLE_PAY_PACKAGE_NAME)

        // Start Google Pay with the intent
        activity.startActivityForResult(intent, GOOGLE_PAY_REQUEST_CODE)
    }

    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == GOOGLE_PAY_REQUEST_CODE) {
            if (promise != null) {
                if (resultCode == Activity.RESULT_OK && data != null) {
                    val response = data.getStringExtra("response")
                    promise?.resolve(response)
                } else {
                    promise?.reject("Payment failed or canceled")
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent?) {
        // Required to be implemented but can be left empty for this scenario
    }
}
