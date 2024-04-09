import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {addUser} from '../../constants/icons';
import {colors, sizings} from '../../constants/theme';
import {AddNewUserStackParamList} from '../../navigation/navigationStackParams';
import {User} from '../../shared/types';
import {useAppDispatch} from '../../hooks';
import {useToast} from 'react-native-toast-notifications';
import {
  AvoidSoftInput,
  useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {userValidationSchema} from '../../shared/validation';
import {generateRandomNumericId} from '../../shared/utils';
import {addNewUser} from '../../store/slices/users';
import {TextInput} from '../../shared/components/TextInput';
import Button from '../../shared/components/Button';

export type UserDetailsNavigationProp = StackNavigationProp<
  AddNewUserStackParamList,
  'AddNewUser'
>;
enum Labels {
  ADD_NEW_USER = 'Add New User',
  NAME = 'Name',
  USERNAME = 'Username',
  EMAIL = 'Email',
  STREET = 'Street',
  CITY = 'City',
  PHONE = 'Phone',
  WEBSITE = 'Website',
  COMPANY_NAME = 'Company Name',
  CATCH_PHRASE = 'Company Catch Phrase',
  SAVE = 'Save',
}

enum Messages {
  ADD_SUCCESS = 'User added successfully. New user will only be persisted locally for the duration of the session.',
  ERROR = 'Oops! Something went wrong. Please try again.',
}

const AnimatedView = Animated.createAnimatedComponent(View);

const AddNewUserScreen = () => {
  const navigation = useNavigation<UserDetailsNavigationProp>();

  const navigateToUsersList = () => {
    navigation.dispatch(
      CommonActions.navigate('UserAdministrationStack', {
        screen: 'UsersList',
        initial: false,
      }),
    );
  };

  const dispatch = useAppDispatch();

  const {bottom: safeAreaInsetsBottom} = useSafeAreaInsets();

  const toast = useToast();

  const bottom =
    Platform.OS === 'android'
      ? safeAreaInsetsBottom
      : safeAreaInsetsBottom
      ? safeAreaInsetsBottom
      : 0;

  let buttonContainerPadding = new Animated.Value(
    bottom ? 0 : sizings.basePadding * 5,
  );

  useEffect(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);

    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useSoftInputHeightChanged(({softInputHeight}) => {
    Animated.timing(buttonContainerPadding, {
      toValue:
        Platform.OS === 'ios' ? softInputHeight - bottom : softInputHeight,
      duration: 250,
      useNativeDriver: false,
    }).start();
  });

  /**
   * Default values for the user form.
   *
   * Some properties are pre-filled to pass validation and to reduce the amount of manual input required from the user.
   * These pre-filled properties serve only as placeholders and cannot be accessed anywhere in the application.
   */
  const defaultValues = {
    id: generateRandomNumericId(),
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      suite: 'Suite placeholder',
      zipcode: 'Zipcode placeholder',
      geo: {
        lat: 'Latitute placeholder',
        lng: 'Longitude placeholder',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: 'Business strategy placeholder',
    },
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid, errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(userValidationSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      await dispatch(addNewUser(data));
      reset();
      toast.show(Messages.ADD_SUCCESS, {type: 'success'});
      navigation.reset({
        index: 0,
        routes: [{name: 'AddNewUser'}],
      });
      navigateToUsersList();
    } catch (error) {
      toast.show(Messages.ERROR, {type: 'error'});
    }
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.screenContainer}>
      <View style={styles.headerWrapper}>
        <Image source={addUser} style={styles.headerImage} />
        <Text style={styles.headerText}>{Labels.ADD_NEW_USER}</Text>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.formWrapper}>
            <Controller
              control={control}
              name="name"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.name ? (errors.name.message as string) : Labels.NAME
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.name}
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.username
                      ? (errors.username.message as string)
                      : Labels.USERNAME
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.username}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.email
                      ? (errors.email.message as string)
                      : Labels.EMAIL
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.email}
                />
              )}
            />
            <Controller
              control={control}
              name="address.street"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.address?.street
                      ? (errors.address?.street.message as string)
                      : Labels.STREET
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.address?.street}
                />
              )}
            />
            <Controller
              control={control}
              name="address.city"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.address?.city
                      ? (errors.address.city.message as string)
                      : Labels.CITY
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.address?.city}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.phone
                      ? (errors.phone.message as string)
                      : Labels.PHONE
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.phone}
                />
              )}
            />
            <Controller
              control={control}
              name="website"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.website
                      ? (errors.website.message as string)
                      : Labels.WEBSITE
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.website}
                />
              )}
            />
            <Controller
              control={control}
              name="company.name"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.company?.name
                      ? (errors.company.name.message as string)
                      : Labels.COMPANY_NAME
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.company?.name}
                />
              )}
            />
            <Controller
              control={control}
              name="company.catchPhrase"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.company?.catchPhrase
                      ? (errors.company?.catchPhrase.message as string)
                      : Labels.CATCH_PHRASE
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.company?.catchPhrase}
                />
              )}
            />
          </View>
        </ScrollView>
        <AnimatedView
          style={[
            {paddingBottom: buttonContainerPadding},
            styles.buttonContainer,
            {paddingTop: bottom ? bottom : sizings.basePadding * 4},
          ]}>
          <Button
            title={Labels.SAVE}
            onPress={handleSubmit(onSubmit)}
            type="secondary"
            width="100%"
            disabled={!isValid}
          />
        </AnimatedView>
      </View>
    </SafeAreaView>
  );
};

export default AddNewUserScreen;

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
  scrollWrapper: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  formWrapper: {
    width: '100%',
    gap: sizings.baseGap * 4,
    marginTop: sizings.baseMargin * 4,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizings.baseGap * 2,
  },
});
