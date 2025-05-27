import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, ViewStyle, TextInputProps as RNTextInputProps } from 'react-native';

interface TextInputProps extends RNTextInputProps {
  containerStyle?: ViewStyle;
}

export function TextInput({ containerStyle, style, ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={[
      styles.container, 
      containerStyle,
      isFocused && styles.focused
    ]}>
      <RNTextInput
        style={[styles.input, style]}
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  focused: {
    borderColor: '#E1742F',
    borderWidth: 1.5,
  },
  input: {
    fontFamily: 'System',
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
});