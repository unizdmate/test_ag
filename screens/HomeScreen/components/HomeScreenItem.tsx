import {
  Animated,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/theme';
import {delay} from '../../../utils';

type HomeScreenItemProps = {
  children: React.ReactNode;
  onPress: () => void;
  animatedScale: Animated.Value;
  style?: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const HomeScreenItem = (props: HomeScreenItemProps) => {
  const {children, onPress, animatedScale, style} = props;

  return (
    <AnimatedPressable
      onPress={async () => {
        await delay(50);
        if (onPress) {
          onPress();
        }
      }}
      style={[
        homeScreenItemStyles.container,
        style,
        {
          transform: [{scale: animatedScale}],
        },
      ]}>
      {children}
    </AnimatedPressable>
  );
};
const homeScreenItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 32,
    minHeight: 155,
  },
  textContainer: {
    maxWidth: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  explanation: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: 'normal',
  },
  imageContainer: {
    width: 81,
    height: 81,
    borderRadius: 81,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 44, resizeMode: 'contain', tintColor: colors.textSecondary},
  notificationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
