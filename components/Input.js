import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Type here to add note."
    //placeholderTextColor={inputPlaceholder}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
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
    fontSize: 27,
    color: 'black',
    backgroundColor: 'transparent',
    fontWeight: '500',
    flex: 1,
    borderColor: '#dddddd',
    borderWidth: 2,
    borderRadius: 10,

  }
});
export default Input;