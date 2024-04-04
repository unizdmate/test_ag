import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <HomeScreen />
    </View>
  );
};

export default () => {
  return <App />;
};

const styles = StyleSheet.create({});
