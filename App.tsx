import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

const navigationContainer = createNavigationContainerRef();

const App = () => {
  return <MainBottomTabNavigator />;
};

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationContainer}>
        <App />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const MainBottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIconStyle: {display: 'none'},
        tabBarStyle: {
          height: 0,
          display: 'none',
        },
      }}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
