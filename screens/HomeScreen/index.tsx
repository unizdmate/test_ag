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
  Text,
} from 'react-native';
import {usersList} from '../../constants/icons';
import {colors, sizings} from '../../constants/theme';
import {name, version} from '../../package.json';
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
      <Text style={styles.appDetails}>{`${name} v${version}`}</Text>
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
