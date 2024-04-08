import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AvoidSoftInput,
  useSoftInputHeightChanged,
} from 'react-native-avoid-softinput';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {rightArrow} from '../../constants/icons';
import {colors, sizings} from '../../constants/theme';
import {UserAdministrationStackParamList} from '../../navigation/navigationStackParams';
import Button from '../../shared/components/Button';
import {TextInput} from '../../shared/components/TextInput';
import {User} from '../../shared/types';
import {validationSchema} from './validationSchema';

type NavigationParamList = {
  params: {
    user: User;
  };
};

type UserDetailsNavigationProp = StackNavigationProp<
  UserAdministrationStackParamList,
  'UserDetails'
>;

enum Labels {
  NAME = 'Name',
  USERNAME = 'Username',
  EMAIL = 'Email',
  STREET = 'Street',
  CITY = 'City',
  PHONE = 'Phone',
  WEBSITE = 'Website',
  COMPANY_NAME = 'Company Name',
  CATCH_PHRASE = 'Company Catch Phrase',
  EDIT = 'Edit',
  DELETE = 'Delete',
  DISCARD = 'Discard',
  SAVE = 'Save',
  GO_BACK = 'Go back',
}

const AnimatedView = Animated.createAnimatedComponent(View);

const UserDetailsScreen = () => {
  const [editMode, setEditMode] = useState(false);

  const route = useRoute<RouteProp<NavigationParamList, 'params'>>();
  const navigation = useNavigation<UserDetailsNavigationProp>();

  const {bottom: safeAreaInsetsBottom} = useSafeAreaInsets();

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

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const defaultValues = {
    name: route.params.user?.name,
    username: route.params.user?.username,
    email: route.params.user?.email,
    street: route.params.user?.address.street,
    city: route.params.user?.address.city,
    phone: route.params.user?.phone,
    website: route.params.user?.website,
    companyName: route.params.user?.company.name,
    catchPhrase: route.params.user?.company.catchPhrase,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid, errors},
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={styles.screenContainer}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={goBack}
        hitSlop={{top: 16, bottom: 16}}>
        <View style={styles.goBackWrapper}>
          <Image source={rightArrow} style={styles.goBackImage} />
          <Text style={styles.goBackText} onPress={goBack}>
            {Labels.GO_BACK}
          </Text>
        </View>
      </TouchableOpacity>
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
                  editable={editMode}
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
                  editable={editMode}
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
                  editable={editMode}
                />
              )}
            />
            <Controller
              control={control}
              name="street"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.street
                      ? (errors.street.message as string)
                      : Labels.STREET
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.street}
                  editable={editMode}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.city ? (errors.city.message as string) : Labels.CITY
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.city}
                  editable={editMode}
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
                  editable={editMode}
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
                  editable={editMode}
                />
              )}
            />
            <Controller
              control={control}
              name="companyName"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.companyName
                      ? (errors.companyName.message as string)
                      : Labels.COMPANY_NAME
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.companyName}
                  editable={editMode}
                />
              )}
            />
            <Controller
              control={control}
              name="catchPhrase"
              render={({field: {value, onChange}}) => (
                <TextInput
                  label={
                    errors.catchPhrase
                      ? (errors.catchPhrase.message as string)
                      : Labels.CATCH_PHRASE
                  }
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.catchPhrase}
                  editable={editMode}
                />
              )}
            />
          </View>
        </ScrollView>
        {editMode ? (
          <AnimatedView
            style={[
              {paddingBottom: buttonContainerPadding},
              styles.buttonContainer,
              {paddingTop: bottom ? bottom : sizings.basePadding * 4},
            ]}>
            <Button
              title={Labels.DISCARD}
              onPress={() => {
                reset();
                setEditMode(prev => !prev);
              }}
              type="accented"
              width="50%"
            />
            <Button
              title={Labels.SAVE}
              onPress={() => {}}
              type="secondary"
              width="50%"
              disabled={!isValid}
            />
          </AnimatedView>
        ) : (
          <AnimatedView
            style={[
              {paddingBottom: buttonContainerPadding},
              styles.buttonContainer,
              {paddingTop: bottom ? bottom : 20},
            ]}>
            <Button
              title={Labels.EDIT}
              onPress={() => setEditMode(prev => !prev)}
              type="accented"
              width="50%"
            />
            <Button
              title={Labels.DELETE}
              onPress={() => {}}
              type="danger"
              width="50%"
            />
          </AnimatedView>
        )}
      </View>
    </SafeAreaView>
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
  goBackWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizings.baseMargin * 2,
    paddingVertical: sizings.basePadding * 4,
  },
  goBackImage: {
    tintColor: colors.accent,
    width: 16,
    height: 16,
    transform: [{rotate: '180deg'}],
  },
  goBackText: {
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
  formWrapper: {width: '100%', gap: 16, marginTop: 16},
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
