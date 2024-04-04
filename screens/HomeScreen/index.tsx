import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {addUser, editUser, userDetails, usersList} from '../../constants/icons';
import {colors, sizings} from '../../constants/theme';
import {name, version} from '../../package.json';
import {FullWidthItem} from './components/FullWidthItem';
import {HalfWidthItem} from './components/HalfWidthItem';
import {HomeScreenItem} from './components/HomeScreenItem';

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const scale = useRef(new Animated.Value(0)).current;

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
      <View>
        <View style={styles.row}>
          <HomeScreenItem animatedScale={scale} onPress={() => {}}>
            <FullWidthItem
              itemTitle="Users List"
              itemExplanation="List of all users in the system"
              icon={usersList}
            />
          </HomeScreenItem>
        </View>
        <View style={styles.row}>
          <HomeScreenItem animatedScale={scale} onPress={() => {}}>
            <HalfWidthItem
              itemTitle="Add User"
              itemExplanation="Add a new user to the system"
              icon={addUser}
            />
          </HomeScreenItem>
          <HomeScreenItem animatedScale={scale} onPress={() => {}}>
            <HalfWidthItem
              itemTitle="Edit User"
              itemExplanation="Edit an existing user"
              icon={editUser}
            />
          </HomeScreenItem>
        </View>
        <View style={styles.row}>
          <HomeScreenItem animatedScale={scale} onPress={() => {}}>
            <FullWidthItem
              itemTitle="User details"
              itemExplanation="View user details"
              icon={userDetails}
            />
          </HomeScreenItem>
        </View>
      </View>
      <Text style={styles.appDetails}>{`${name} v${version}`}</Text>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: sizings.basePadding * 4,
    paddingVertical: sizings.basePadding * 2,
    backgroundColor: colors.background,
    borderWidth: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
});
