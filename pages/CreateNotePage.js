import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

import Input from '../components/Input';
import {COLORS} from '../assets/colors';

export default function CreateNotePage(props){
  const [currNote, setCurrNote] = React.useState('');
  const [currHeader, setCurrHeader] = React.useState('')
  const [date, setDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  
  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.input}
          value={currHeader}
          onChangeText={(inp)=>setCurrHeader(inp)}
          maxLength={30}
          placeholder="My Note..."
        />
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          onPress={()=>setShowDate(!showDate)}
        >
          <Text
            style={styles.dateText}
          >{date.toISOString().slice(0,10).replace(/-\//g,"")}</Text>
        </TouchableOpacity>
        {showDate && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDate(false);
            setDate(currentDate);
          }}
        />)}
      </View>
      <View style={styles.inputContainer}>
        <Input 
          inputValue={currNote} 
          onChangeText={(inp)=>setCurrNote(inp)} 
          onDoneAddItem={props.appendNote}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={()=>{
            let note = {
              text: currNote,
              date: date,
              title: currHeader,
              id: props.noteList.length==0 ? 0 : props.noteList[props.noteList.length-1].id+1,
            };
            props.onCreateNewNote(note);
            setCurrNote('');
            setCurrHeader('');
          }}
          mode="contained"
          color={COLORS.secondary}
        >Add Note</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
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
    paddingTop: 20
  },
  dateText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '200',
    color: COLORS.text
  }
})