import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import appStyles from '../styles';

export default function Loading() {
  return (
    <View style={styles.wrapper}>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {...appStyles.container},
});
