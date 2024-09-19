import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const IconInput = ({ title, onChangeText, error, keyboardType,maxLength }) => {
  let defaultTheme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        label={title}
        mode='outlined'
        outlineColor={error ? 'red' : COLORS.primary} // Set red if error exists
        activeOutlineColor={error ? 'red' : COLORS.secondry} // Active color becomes red if error
        style={[styles.input, { backgroundColor: 'white' }]}
        onChangeText={onChangeText}
        // left={left}
        theme={{ roundness: 25 }}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default IconInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, // Adds space between input fields
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,  // Adds borderRadius of 25
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '400',
  },
});
