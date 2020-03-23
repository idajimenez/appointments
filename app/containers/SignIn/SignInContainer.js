import React, {useState} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import SignIn from './SignIn';
import {tokenKey} from '../../config/constants';

function SignInScreen({dispatch}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    const token = 'dummy-auth-token';
    dispatch({type: 'SIGN_IN', token});
    await AsyncStorage.setItem(tokenKey, token);
  };

  return (
    <SignIn
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleAuth={handleAuth}
    />
  );
}

export default connect()(SignInScreen);
