import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, sizings} from '../../../constants/theme';

type AppInfoProps = {
  animatedScale: Animated.Value;
  info: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);

const AppInfo = ({animatedScale, info}: AppInfoProps) => {
  return (
    <AnimatedView
      style={[
        styles.container,
        {
          transform: [{scale: animatedScale}],
        },
      ]}>
      <Text style={styles.appInfo}>{info}</Text>
    </AnimatedView>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: sizings.baseMargin * 2,
  },
  appInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
  },
});
