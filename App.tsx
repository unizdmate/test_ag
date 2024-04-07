import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {HomeScreenBottomTabButton} from './components/HomeScreenBottomTabButton';
import {TabBarLabel} from './components/TabBarLabel';
import {colors} from './constants/theme';
import AddNewUserScreen from './screens/AddNewUserScreen';
import HomeScreen from './screens/HomeScreen';
import UsersListScreen from './screens/UsersListScreen';
import {persistor, store} from './store';

const navigationContainer = createNavigationContainerRef();

enum Routes {
  HOME = 'Home',
  USER_ADMINITRATION = 'Administration',
  ADD_USER = 'Add New User',
}

const App = () => {
  return <MainBottomTabNavigator />;
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationContainer}>
            <App />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
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
      initialRouteName="UserList"
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 250,
      }}>
      <Stack.Screen name="UsersList" component={UsersListScreen} />
    </Stack.Navigator>
  );
};

const AddNewUserStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="AddNewUser"
      screenOptions={{
        headerShown: false,
        animation: 'simple_push',
        animationDuration: 250,
      }}>
      <Stack.Screen name="AddNewUser" component={AddNewUserScreen} />
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
          backgroundColor: colors.primary,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="UserAdministrationStack"
        component={UserAdministrationStack}
        options={{
          tabBarLabel: props => (
            <TabBarLabel {...props}>{Routes.USER_ADMINITRATION}</TabBarLabel>
          ),
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarButton: props => <HomeScreenBottomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="AddNewUserStack"
        component={AddNewUserStack}
        options={{
          tabBarLabel: props => (
            <TabBarLabel {...props}>{Routes.ADD_USER}</TabBarLabel>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
