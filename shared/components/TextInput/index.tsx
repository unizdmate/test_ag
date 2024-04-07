import {StyleSheet, Text, View, TextInput as RNTextInput} from 'react-native';
import React from 'react';
import {colors, sizings} from '../../../constants/theme';

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        style={[styles.input, disabled && {opacity: 0.75}]}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: sizings.basePadding,
    marginBottom: sizings.baseMargin * 2,
    position: 'relative',
    width: '100%',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: sizings.basePadding * 2,
    backgroundColor: colors.background,
    paddingHorizontal: sizings.basePadding,
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    paddingLeft: sizings.basePadding * 2,
    color: colors.textPrimary,
    fontSize: 16,
  },
});
