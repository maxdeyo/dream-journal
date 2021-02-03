import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import Constants from 'expo-constants';

import CreateNotePage from './CreateNotePage';
import { Card } from 'react-native-paper';
import EditNotePage from './EditNotePage';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Card style={styles.cardStyle}>
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text} numberOfLines={1}>{item.text}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

export default function NoteList({navigation}){
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editModalID, setEditModalID] = React.useState(null);
  const [noteList, setNoteList] = React.useState([]);

  /*const appendNote = (note) => {
    setNoteList(()=>{
      let temp = noteList;
      temp.push(note);
      return temp;
    })
  }*/
  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => {
            setEditModalID(item.id);
            setEditModalVisible(true);
        }}
      />
    );
  };

  return(
    <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
        >
            <EditNotePage 
                setNoteList={setNoteList}
                setModalVisible={setEditModalVisible}
                noteList={noteList}
                id={editModalID}
            />
        </Modal>
      {
        modalVisible ? 
        <CreateNotePage 
          setNoteList={setNoteList}
          setModalVisible={setModalVisible}
          noteList={noteList}
        /> :
        <View style={{flex: 1}}>
        <SafeAreaView style={styles.flatList}>
          {
            (noteList.length>0)? 
            <FlatList
              data={noteList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            :<Text>No Notes Saved!</Text>
          }
        </SafeAreaView>
        <Button style={styles.button} title='Add Note' onPress={()=>setModalVisible(true)} />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 24,
    alignContent: 'center',
    justifyContent: 'center'
  },
  item: {
    flex: 1
  },
  flatList: {
    flex: 5
  },
  button: {
    flex: 1,
    paddingBottom: 30
  },
  title: {
    flex: 1,
    fontWeight: '600',
    fontSize: 36
  },
  text: {
    flex: 1,
    fontWeight: '200',
    fontSize: 20
  },
  cardStyle: {
    padding: 15,
    margin: 10,
    backgroundColor: '#55e02b'
  },
  cardText: {
    justifyContent: 'center'
  }
})