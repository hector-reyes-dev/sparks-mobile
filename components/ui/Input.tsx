import React from 'react';
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({ style, textStyle, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style, textStyle]}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 44,
  },
});