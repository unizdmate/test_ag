import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {colors} from '../../constants/theme';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../hooks';
import {fetchUsers} from '../../store/slices/users';
import {RootState} from '../../store';

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Text
        onPress={goBack}
        style={{
          fontSize: 16,
          color: colors.textSecondary,
          fontWeight: 'normal',
        }}>
        Users list
      </Text>
      {users.users.map((user, index) => (
        <Text key={index} style={{color: colors.textPrimary}}>
          {user.name}
        </Text>
      ))}
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({});
