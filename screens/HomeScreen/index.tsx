import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  BackHandler,
  InteractionManager,
  NativeEventSubscription,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {usersList} from '../../constants/icons';
import {colors, sizings} from '../../constants/theme';
import {name, version} from '../../package.json';
import AppInfo from './components/AppInfo';
import {HomeScreenItem} from './components/HomeScreenItem';

enum strings {
  ITEM_TITLE = 'User management',
  ITEM_EXPLANATION = 'View and manage all users, create new accounts, or delete existing ones.',
}

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const scale = useRef(new Animated.Value(0)).current;

  const hideBottomTabBar = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  };

  const showBottomTabBar = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 0,
      },
    });
  };

  const navigateToUsersListScreen = () => {
    Animated.timing(scale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.dispatch(
        CommonActions.navigate('UserAdministrationStack', {
          screen: 'UsersList',
          initial: false,
        }),
      );
    });
  };

  /**
   * This useEffect hook is responsible for hiding the bottom tab bar and adding a back button event listener
   * when the screen is focused. When the screen is unfocused or unmounted, it shows the bottom tab bar and removes
   * the back button event listener. Back button event listener is added to prevent the user from going back to the
   * previous screen once they have navigated to the Home screen solely for the purpose of this test.
   *
   * @param {boolean} isFocused - A boolean indicating whether the screen is currently focused.
   * @param {object} navigation - The navigation object from react-navigation.
   */
  useEffect(() => {
    let backHandler: NativeEventSubscription;

    if (isFocused) {
      hideBottomTabBar();
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
      });
    }

    return () => {
      showBottomTabBar();
      if (backHandler) backHandler.remove();
    };
  }, [isFocused, navigation]);

  /**
   * This useEffect hook is responsible for starting an animation after all interactions have been processed
   * when the screen is focused. When the screen is unfocused or unmounted, it cancels the task and resets the animation.
   *
   * @param {boolean} isFocused - A boolean indicating whether the screen is currently focused.
   */
  useEffect(() => {
    let task: any;

    if (isFocused) {
      task = InteractionManager.runAfterInteractions(() => {
        Animated.spring(scale, {
          toValue: 1,
          speed: 10,
          bounciness: Platform.OS === 'android' ? 4 : 8,
          useNativeDriver: true,
        }).start();
      });
    }

    return () => {
      task?.cancel();
      scale?.resetAnimation();
    };
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.contentContainer}>
      <HomeScreenItem
        animatedScale={scale}
        onPress={navigateToUsersListScreen}
        itemTitle={strings.ITEM_TITLE}
        itemExplanation={strings.ITEM_EXPLANATION}
        icon={usersList}></HomeScreenItem>
      <AppInfo animatedScale={scale} info={`${name} v${version}`}></AppInfo>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: '100%',
    padding: sizings.basePadding * 4,
    backgroundColor: colors.background,
    borderWidth: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  appDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
  },
});
