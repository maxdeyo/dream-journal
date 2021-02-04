import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import Constants from 'expo-constants';
import { FAB, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateNotePage from './CreateNotePage';
import { Card } from 'react-native-paper';
import EditNotePage from './EditNotePage';
import NoteCard from '../components/NoteCard';

import {COLORS} from '../assets/colors';
import {storeData, getData} from '../storage/async_storage';




  
  const contains = (note, query) => {
  
    if (note.text.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
      return true;
    }
  
    return false;
  };



export default function NoteList({navigation}){
    const onCreateNewNote = async (note) => {
        let temp = noteList;
        temp.push(note);

        setNoteList(temp);
        setModalVisible(false);
        await storeData(temp);
        
    }
    const onEditNote = async (note, index) => {
        let temp = noteList;
        temp[index] = note;

        setNoteList(temp);
        setEditModalVisible(false);
        await storeData(temp);
        
    }

    const deleteNote = async (id) => {
        let temp = noteList.filter(x => {
            return x.id != id;
        });
        setNoteList(temp);
        await storeData(temp);
        setQuery('');
    }


    const [noteList, setNoteList] = React.useState([]);
    React.useEffect(() => {
        const checkAsync = async () => {
            const value = await getData();
            if (value !== undefined && value !== null){
                console.log(JSON.stringify(value));
                setNoteList(value);
            } else {
                setNoteList([]);
            }
        }
        checkAsync();
    }, []);
    React.useEffect( () => {
        setFilteredList(noteList);
    }, [noteList]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [editModalID, setEditModalID] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [filteredList, setFilteredList] = React.useState(noteList);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = noteList.filter(note => {
      return contains(note, formattedQuery);
    });
    setFilteredList(filteredData);
    setQuery(text);
  };

  
 

  
  const renderCard = ({ item }) => {

    return (
      <NoteCard
        item={item}
        onPress={() => {
            setEditModalID(item.id);
            setEditModalVisible(true);
        }}
        deleteNote={deleteNote}
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
                onEditNote={onEditNote}
            />
        </Modal>
      {
        modalVisible ? 
        <CreateNotePage 
          setNoteList={setNoteList}
          setModalVisible={setModalVisible}
          noteList={noteList}
          onCreateNewNote={onCreateNewNote}
        /> :
        <View style={{flex: 1}}>
        <SafeAreaView style={styles.flatList}>
          {
            (noteList.length>0)? 
            <View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={handleSearch}
                    value={query}
                />
                <FlatList
                data={filteredList&&filteredList.length>0&&query!='' ? filteredList : noteList}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                />
            </View>
            :<Text style={styles.centeredText}>No Notes Saved!</Text>
          }
        </SafeAreaView>
        <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() => setModalVisible(true)}
        />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.background,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary
  },
  centeredText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: COLORS.text
  }
})