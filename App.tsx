import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors, sizings} from './constants/theme';
import {useAppDispatch} from './hooks';
import AddNewUserScreen from './screens/AddNewUserScreen';
import HomeScreen from './screens/HomeScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import UsersListScreen from './screens/UsersListScreen';
import {HomeScreenBottomTabButton} from './shared/components/HomeScreenBottomTabButton';
import {TabBarLabel} from './shared/components/TabBarLabel';
import {persistor, store} from './store';
import {fetchUsers} from './store/slices/users';

const navigationContainer = createNavigationContainerRef();

enum Routes {
  HOME = 'Home',
  USER_ADMINITRATION = 'Administration',
  ADD_USER = 'Add New User',
}

const App = () => {
  const dispatch = useAppDispatch();
  const initializeApp = async () => {
    await dispatch(fetchUsers()).unwrap();
    // In real life application, we can add more initialization logic here
  };

  useEffect(() => {
    initializeApp();
  }, []);
  return <MainBottomTabNavigator />;
};

const TopSafeArea = () => {
  return (
    <>
      {Platform.OS === 'android' ? (
        <StatusBar backgroundColor={colors.background} animated />
      ) : null}
      <SafeAreaView
        // @ts-expect-error
        edges={['top']}
        style={{
          flex: 0,
          backgroundColor: colors.background,
        }}
      />
    </>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          placement="top"
          offset={sizings.baseMargin * 12}
          duration={5000}
          animationType="slide-in"
          animationDuration={250}
          swipeEnabled={true}
          successColor={colors.secondary}
          dangerColor={colors.danger}
          normalColor={colors.primary}
          textStyle={{
            fontSize: 16,
            color: colors.textPrimary,
            fontWeight: 'normal',
          }}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationContainer}>
              <TopSafeArea />
              <App />
            </NavigationContainer>
          </SafeAreaProvider>
        </ToastProvider>
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
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
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
  const safeAreaInsets = useSafeAreaInsets();

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
          height: 60 + safeAreaInsets.bottom,
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
