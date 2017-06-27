package com.novame;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.smixx.fabric.FabricPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.cmcewen.blurview.BlurViewPackage;
import io.fullstack.oauth.OAuthManagerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.oney.WebRTCModule.WebRTCModulePackage;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush("wq4Y6g3H0Rn_jpM_XgvekNRmrpKxcc8bd796-9b62-4355-995d-a57138ae013d", getApplicationContext(), BuildConfig.DEBUG),
            new FabricPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage(),
            new RNGeocoderPackage(),
            new PhotoViewPackage(),
            new BlurViewPackage(),
            new OAuthManagerPackage(),
            new LinearGradientPackage(),
            new ReactNativeOneSignalPackage(),
            new WebRTCModulePackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new SvgPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
