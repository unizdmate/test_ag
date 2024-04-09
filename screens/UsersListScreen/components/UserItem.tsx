import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rightArrow} from '../../../constants/icons';
import {colors, sizings} from '../../../constants/theme';
import {User} from '../../../shared/types';

enum Labels {
  NAME = 'Name',
  USERNAME = 'Username',
  EMAIL = 'Email',
  COMPANY = 'Company',
}

type ExtenderProps = {
  onPress: (userId: number) => void;
};

type UserItemProps = User & ExtenderProps;

export const UserItem = (props: UserItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => props.onPress(props.id)}>
      <View style={styles.componentWrapper}>
        <View style={styles.column}>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>{Labels.NAME}</Text>
            <Text
              style={styles.valueText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.name}
            </Text>
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>{Labels.USERNAME}</Text>
            <Text
              style={styles.valueText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.username}
            </Text>
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>{Labels.EMAIL}</Text>
            <Text
              style={styles.valueText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.email}
            </Text>
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>{Labels.COMPANY}</Text>
            <Text
              style={styles.valueText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {props.company.name}
            </Text>
            <View style={{flex: 1}} />
            <Image source={rightArrow} style={styles.rightArrowImage} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  componentWrapper: {
    width: '100%',
    paddingVertical: sizings.basePadding,
    paddingHorizontal: sizings.basePadding * 4,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: sizings.baseRadius * 2,
    marginBottom: sizings.baseMargin * 4,
  },
  column: {
    gap: sizings.baseGap,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textSecondary,
    width: '25%',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.textPrimary,
  },
  rightArrowImage: {
    tintColor: colors.secondary,
    width: 16,
    height: 16,
  },
});
