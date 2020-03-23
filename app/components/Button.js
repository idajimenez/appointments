/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import appStyles from '../styles';

export default function Button({onPress, label, style = {}, isLight = false}) {
  const {width: screenWidth} = useWindowDimensions();
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{...styles.button, width: screenWidth * 0.85, ...style}}>
      <Text style={[styles.buttonText, isLight ? {color: '#000'} : {}]}>
        {label}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    ...appStyles.button,
  },
  buttonText: {
    ...appStyles.buttonText,
  },
});
