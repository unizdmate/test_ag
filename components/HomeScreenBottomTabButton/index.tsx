import React, {useEffect} from 'react';
import {Animated, Image, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/theme';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {homeScreen} from '../../constants/icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const HomeScreenBottomTabButton = ({
  onPress,
}: BottomTabBarButtonProps) => {
  const handlePress = (e: any) => {
    if (onPress) {
      onPress(e);
    }
  };

  const scale = new Animated.Value(1);

  useEffect(() => {
    return () => scale?.stopAnimation();
  }, []);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      speed: 50,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <AnimatedPressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={handlePress}
        style={[styles.pressable, {transform: [{scale: scale}]}]}>
        <Image
          source={homeScreen}
          style={{width: 40, height: 40}}
          resizeMode="contain"
        />
      </AnimatedPressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 99999999,
  },
  pressable: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
});
