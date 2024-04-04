import {Image, ImageStyle, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/theme';

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
    marginBottom: 5,
  },
  itemExplanation: {
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
    backgroundColor: colors.secondary,
  },
  image: {width: 44, resizeMode: 'contain'},
});
