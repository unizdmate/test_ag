import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type: 'primary' | 'secondary' | 'accented' | 'danger';
  width: '50%' | '100%';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  width = '100%',
  disabled = false,
}) => {
  const renderBorderColor = () => {
    switch (type) {
      case 'primary':
        return colors.textPrimary;
      case 'secondary':
        return colors.secondary;
      case 'accented':
        return colors.accent;
      case 'danger':
        return colors.danger;
      default:
        return 'black';
    }
  };

  const renderFontColor = () => {
    switch (type) {
      case 'primary':
        return colors.textPrimary;
      case 'secondary':
        return colors.secondary;
      case 'accented':
        return colors.accent;
      case 'danger':
        return colors.danger;
      default:
        return 'black';
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: renderBorderColor(),
          width: width,
          opacity: disabled ? 0.75 : 1,
        },
      ]}
      onPress={disabled ? () => {} : onPress}>
      <Text
        style={[
          styles.text,
          {color: renderFontColor(), opacity: disabled ? 0.75 : 1},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
