import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../constants/theme';

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
      <Text style={mediumItemStyles.title}>{itemTitle}</Text>
      <Text style={mediumItemStyles.subtitle}>{itemExplanation}</Text>
    </View>
  );
};

const mediumItemStyles = StyleSheet.create({
  column: {
    gap: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    minHeight: 155,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {height: 20, resizeMode: 'contain'},
  title: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {fontSize: 14, color: colors.textSecondary, fontWeight: 'bold'},
});
