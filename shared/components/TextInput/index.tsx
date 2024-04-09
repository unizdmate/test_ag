import {StyleSheet, Text, View, TextInput as RNTextInput} from 'react-native';
import React from 'react';
import {colors, sizings} from '../../../constants/theme';

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  error?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  error = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        {borderColor: error ? colors.danger : colors.textSecondary},
      ]}>
      <Text
        style={[
          styles.label,
          {color: error ? colors.danger : colors.textSecondary},
        ]}>
        {label}
      </Text>
      <RNTextInput
        style={[styles.input, !editable && {opacity: 0.75}]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholder={value ? '' : placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: sizings.baseRadius * 2,
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
