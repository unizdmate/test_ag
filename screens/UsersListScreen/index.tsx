import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constants/theme';

const UsersListScreen = () => {
  const navigation = useNavigation();

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
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({});
