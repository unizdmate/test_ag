import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, sizings} from '../../constants/theme';
import {UserAdministrationStackParamList} from '../../navigation/navigationStackParams';
import {RootState} from '../../store';
import {UserItem} from './components/UserItem';
import {usersList} from '../../constants/icons';
import EmptyList from './components/EmptyList';

type UsersListNavigationProp = StackNavigationProp<
  UserAdministrationStackParamList,
  'UsersList'
>;

enum Labels {
  USERS_LIST = 'List of Available Users',
}

const UsersListScreen = () => {
  const navigation = useNavigation<UsersListNavigationProp>();

  const users = useSelector((state: RootState) => state.users);

  const navigateToUserDetails = (userId: number) => {
    const userDetails = users.users.find(user => user.id === userId);
    if (userDetails) {
      navigation.navigate('UserDetails', {user: userDetails});
    }
  };

  const navigateToAddNewUser = () => {
    navigation.dispatch(
      CommonActions.navigate('AddNewUserStack', {
        screen: 'AddNewUser',
        initial: false,
      }),
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerWrapper}>
        <Image source={usersList} style={styles.headerImage} />
        <Text style={styles.headerText}>{Labels.USERS_LIST}</Text>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={users.users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UserItem {...item} onPress={navigateToUserDetails} />
        )}
        ListEmptyComponent={
          <EmptyList navigateToAddNewUser={navigateToAddNewUser} />
        }
      />
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: sizings.basePadding * 4,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizings.baseGap * 2,
    paddingVertical: sizings.basePadding * 4,
  },
  headerImage: {
    tintColor: colors.accent,
    width: 16,
    height: 16,
  },
  headerText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
