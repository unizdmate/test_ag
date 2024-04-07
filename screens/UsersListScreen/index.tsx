import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {colors, sizings} from '../../constants/theme';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../hooks';
import {addNewUser, fetchUsers} from '../../store/slices/users';
import {RootState} from '../../store';
import {UserItem} from './components/UserItem';
import {TextInput} from '../../shared/components/TextInput';

const UsersListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUsers());
    }
    return () => {
      // Cleanup
    };
  }, [isFocused, navigation]);

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const doAddUser = async (user: any) => {
    dispatch(addNewUser(user));
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        style={{width: '100%'}}
        data={users.users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserItem {...item} />}
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
