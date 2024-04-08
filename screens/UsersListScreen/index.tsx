import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, sizings} from '../../constants/theme';
import {useAppDispatch} from '../../hooks';
import {RootState} from '../../store';
import {fetchUsers} from '../../store/slices/users';
import {UserItem} from './components/UserItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserAdministrationStackParamList} from '../../navigation/navigationStackParams';

type UsersListNavigationProp = StackNavigationProp<
  UserAdministrationStackParamList,
  'UsersList'
>;

const UsersListScreen = () => {
  const navigation = useNavigation<UsersListNavigationProp>();

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users);

  const navigateToUserDetails = (userId: number) => {
    const user = users.users.find(user => user.id === userId);
    if (user) {
      navigation.navigate('UserDetails', {user});
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUsers());
    }
    return () => {
      // Cleanup
    };
  }, [isFocused, navigation]);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        style={{width: '100%'}}
        data={users.users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UserItem {...item} onPress={navigateToUserDetails} />
        )}
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
});
