package com.novame;

import android.app.Application;

import com.facebook.react.ReactApplication;
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

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
