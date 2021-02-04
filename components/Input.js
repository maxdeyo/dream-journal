import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import {COLORS} from '../assets/colors';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Type here to add note."
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem}
  />
);
const styles = StyleSheet.create({
  input: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    color: COLORS.text,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
    fontWeight: '500',
    flex: 1,
    borderColor: COLORS.tertiary.toString() + '33',
    borderWidth: 2,
    borderRadius: 10,

  }
});
export default Input;