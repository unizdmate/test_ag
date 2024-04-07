import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors, sizings} from '../../constants/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserAdministrationStackParamList} from '../../navigation/navigationStackParams';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {fetchUserById, resetUserState} from '../../store/slices/users';
import {useAppDispatch} from '../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {TextInput} from '../../shared/components/TextInput';

type NavigationParamList = {
  params: {
    userId: number;
  };
};

type UserDetailsNavigationProp = StackNavigationProp<
  UserAdministrationStackParamList,
  'UserDetails'
>;

const UserDetailsScreen = () => {
  const route = useRoute<RouteProp<NavigationParamList, 'params'>>();
  const navigation = useNavigation<UserDetailsNavigationProp>();
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const {user, status} = useSelector((state: RootState) => state.users);

  const {userId} = route.params;

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUserById(userId));
    }
    return () => {
      dispatch(resetUserState());
    };
  }, []);

  if (status === 'loading') {
    <View style={styles.screenContainer}>
      <Text>UserDetailsScreen</Text>
    </View>;
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={{color: 'white'}} onPress={goBack}>
        Go Back
      </Text>
      <View style={{width: '100%', gap: 8}}>
        <TextInput
          label="Name"
          disabled
          value={user?.name || ''}
          onChangeText={() => {}}
        />
        <TextInput
          label="Address"
          value={user?.address.street || ''}
          onChangeText={() => {}}
        />
        <TextInput
          label="City"
          value={user?.address.city || ''}
          onChangeText={() => {}}
        />
      </View>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: sizings.basePadding * 4,
  },
});
