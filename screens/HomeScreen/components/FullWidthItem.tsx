import {Image, ImageStyle, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, sizings} from '../../../constants/theme';

type FullWidthItemProps = {
  itemTitle: string;
  itemExplanation: string;
  icon: any;
};

export const FullWidthItem = ({
  itemTitle,
  itemExplanation,
  icon,
}: FullWidthItemProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{itemTitle}</Text>
        <Text style={styles.itemExplanation}>{itemExplanation}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image as ImageStyle} source={icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: sizings.basePadding * 8,
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
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  image: {width: 44, resizeMode: 'contain'},
});
