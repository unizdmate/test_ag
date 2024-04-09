import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, sizings} from '../../../constants/theme';
import Button from '../../../shared/components/Button';

type EmptyListProps = {
  navigateToAddNewUser: () => void;
};

enum Labels {
  EMPTY = 'The List is Empty',
  NOTICE = 'Feel free to add a new user to the list.',
  ADD_NEW_USER = 'Add New User',
}

const EmptyList = ({navigateToAddNewUser}: EmptyListProps) => {
  return (
    <View style={styles.componentWrapper}>
      <Text style={styles.title}>{Labels.EMPTY}</Text>
      <Text style={styles.notice}>{Labels.NOTICE}</Text>
      <Button
        title={Labels.ADD_NEW_USER}
        onPress={navigateToAddNewUser}
        type="primary"
        width="100%"
      />
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  componentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: sizings.baseGap * 8,
  },
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  notice: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: 'normal',
  },
});
