import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {colors, sizings} from '../../../constants/theme';

type TabBarLabelProps = {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
};

export const TabBarLabel = ({focused, children}: TabBarLabelProps) => {
  return (
    <View style={styles.componentWrapper}>
      <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  componentWrapper: {
    paddingBottom: sizings.basePadding * 4,
  },
  activeLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: 'normal',
  },
});
