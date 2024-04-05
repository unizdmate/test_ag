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
import UsersListScreen from './screens/UsersListScreen';
import {HomeScreenBottomTabButton} from './components/HomeScreenBottomTabButton';
import {colors} from './constants/theme';

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
        animation: 'simple_push',
        animationDuration: 250,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const UserAdministrationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="AddUser"
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 250,
      }}>
      <Stack.Screen name="UsersList" component={UsersListScreen} />
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
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarButton: props => <HomeScreenBottomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="UserAdministrationStack"
        component={UserAdministrationStack}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
