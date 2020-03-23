import React from 'react';
import {View, TextInput, StyleSheet, useWindowDimensions} from 'react-native';
import Button from '../../components/Button';
import appStyles from '../../styles';

export default function SignIn({
  username,
  setUsername,
  password,
  setPassword,
  handleAuth,
}) {
  const {width: screenWidth} = useWindowDimensions();

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{...styles.input, width: screenWidth * 0.85}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{...styles.input, width: screenWidth * 0.85}}
      />
      <Button onPress={handleAuth} label="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {...appStyles.container},
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    fontSize: 18,
    height: 40,
    marginBottom: 10,
    padding: 8,
  },
});
