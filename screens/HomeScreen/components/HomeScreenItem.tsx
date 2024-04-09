import {
  Animated,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, sizings} from '../../../constants/theme';
import {delay} from '../../../shared/utils';

type HomeScreenItemProps = {
  onPress: () => void;
  animatedScale: Animated.Value;
  itemTitle: string;
  itemExplanation: string;
  icon: any;
  style?: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const HomeScreenItem = (props: HomeScreenItemProps) => {
  const {onPress, animatedScale, itemTitle, itemExplanation, icon, style} =
    props;

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
      <View style={homeScreenItemStyles.item}>
        <View style={homeScreenItemStyles.textContainer}>
          <Text style={homeScreenItemStyles.itemTitle}>{itemTitle}</Text>
          <Text style={homeScreenItemStyles.itemExplanation}>
            {itemExplanation}
          </Text>
        </View>
        <View style={homeScreenItemStyles.imageContainer}>
          <Image
            style={homeScreenItemStyles.image as ImageStyle}
            source={icon}
          />
        </View>
      </View>
    </AnimatedPressable>
  );
};
const homeScreenItemStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: sizings.baseRadius * 5,
  },
  item: {
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
  itemTitle: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: sizings.baseMargin,
  },
  itemExplanation: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: 'normal',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: sizings.baseRadius * 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  image: {width: 44, resizeMode: 'contain'},
});
