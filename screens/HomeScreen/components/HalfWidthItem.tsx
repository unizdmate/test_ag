import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, sizings} from '../../../constants/theme';

type HalfWidthItemProps = {
  itemTitle: string;
  itemExplanation: string;
  icon: any;
  alert?: boolean;
};
export const HalfWidthItem = ({
  itemTitle,
  itemExplanation,
  icon,
}: HalfWidthItemProps) => {
  return (
    <View style={mediumItemStyles.column}>
      <View style={mediumItemStyles.imageContainer}>
        <Image style={mediumItemStyles.image} source={icon} />
      </View>
      <View style={mediumItemStyles.textContainer}>
        <Text style={mediumItemStyles.itemTitle}>{itemTitle}</Text>
        <Text style={mediumItemStyles.itemExplanation}>{itemExplanation}</Text>
      </View>
    </View>
  );
};

const mediumItemStyles = StyleSheet.create({
  column: {
    gap: 5,
    paddingVertical: sizings.basePadding * 4,
    paddingHorizontal: sizings.basePadding * 5,
    minHeight: 155,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizings.baseMargin * 2,
  },
  image: {height: 20, resizeMode: 'contain'},
  textContainer: {},
  itemTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: sizings.baseMargin,
  },
  itemExplanation: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: 'normal',
  },
});
