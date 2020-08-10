import React from 'react';
import {View} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '773415350379-88hfg9g1eeek0e36mmmc5rpcrjpcg6es.apps.googleusercontent.com',
});

const SigIn = () => {

  const signIn = async () => {
    console.log('Run sigIn');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};

export default SigIn;
