import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';

import {LoginManager, AccessToken} from 'react-native-fbsdk';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const Login = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const getInformation = () => {
    const field = 'id,name,first_name,last_name,picture';
    const URL = `https://graph.facebook.com/me?fields=${field}&access_token=${token}`;
    return fetch(URL);
  };

  const getToken = () => {
    AccessToken.getCurrentAccessToken();
    handleGetToken().then(data => {
      const {accessToken} = data;
      setToken(accessToken);
      setIsLogin(true);
    });
  };

  const handleOnPress = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        const {isCancelled} = result;
        if (!isCancelled) {
          getToken();
        } else {
          console.log('Request is cancel');
        }
      },
      error => console.log('error', error),
    );
  };

  useEffect(() => {
    isLogin &&
      getInformation()
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.log('error', error));
  }, [isLogin]);

  renderProfile = () => {
    if (user) {
      const {
        id,
        name,
        picture: {
          data: {url},
        },
      } = user;
      return (
        <>
          <Text>Login success</Text>
          <Text>Profile</Text>
          <Text>id: {id} </Text>
          <Text>name: {name} </Text>
          <Text>url: {url} </Text>
        </>
      );
    }
  };
  return (
    <View
      style={{
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!isLogin ? (
        <TouchableOpacity onPress={handleOnPress}>
          <View
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#666eec',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Login facebook
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        renderProfile()
      )}
    </View>
  );
};

export default Login;
