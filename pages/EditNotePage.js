import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

import Input from '../components/Input';
import {COLORS} from '../assets/colors';



export default function EditNotePage(props){
    const index = props.noteList.map(function(el) {
        return el.id;
      }).indexOf(props.id);
    const note = props.noteList.find(x => x.id === props.id);

    const [currNote, setCurrNote] = React.useState(note.text);
    const [currHeader, setCurrHeader] = React.useState(note.title)
    const [date, setDate] = React.useState(note.date);
    const [showDate, setShowDate] = React.useState(false);

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
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={()=>{
            let newObj = {
              text: currNote,
              title: currHeader,
              date: date,
              id: props.id
            };
            props.onEditNote(newObj, index);
            setCurrNote('');
            setCurrHeader('');
          }}
          mode="contained"
          color={COLORS.secondary}
          >Save Note</Button>
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
    paddingTop: 20,
    flex: 1
  },
  dateText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '200',
    color: COLORS.text
  }
})