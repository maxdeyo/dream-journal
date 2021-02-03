import React from 'react';
import { View, Text, StyleSheet, Button, TextInput} from 'react-native';
import Constants from 'expo-constants';

import Input from '../components/Input';

export default function EditNotePage(props){
  const [currNote, setCurrNote] = React.useState(props.noteList[props.id].text);
  const [currHeader, setCurrHeader] = React.useState(props.noteList[props.id].title)
  
  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.input}
          value={currHeader}
          onChangeText={(inp)=>setCurrHeader(inp)}
          maxLength={30}
          placeholder='My Note'
        />
      </View>
      <View style={styles.inputContainer}>
        <Input 
          inputValue={currNote} 
          onChangeText={(inp)=>setCurrNote(inp)} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={()=>{
            let index = props.noteList.findIndex(x => x.id === props.id);
            let temp = props.noteList;
            let newObj = {
              text: currNote,
              title: currHeader,
              id: props.id
            };
            temp[index] = newObj;

            props.setNoteList(temp);
            setCurrNote('');
            setCurrHeader('');
            props.setModalVisible(false);
          }}
          title="Save Note"
          color="#841584"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 5
  },
  input: {
    alignSelf: 'center',
    fontSize: 36
  },
  buttonContainer: {
    paddingTop: 20,
    flex: 1
  }
})