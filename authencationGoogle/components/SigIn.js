import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';

const {width, height} = Dimensions.get('window');

GoogleSignin.configure({
  webClientId:
    '773415350379-88hfg9g1eeek0e36mmmc5rpcrjpcg6es.apps.googleusercontent.com',
});

const SigIn = () => {
  const [token, setToken] = useState();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setToken(userInfo);
      token && Alert.alert(JSON.stringify(token));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Error sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Error sign in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error play servies not available');
      } else {
        // some other error happened
        Alert.alert('Error something');
      }
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    width: 192,
    height: 48,
  },
});
export default SigIn;
