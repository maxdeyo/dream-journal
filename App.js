import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Constants from 'expo-constants';

import {COLORS} from './assets/colors';


import NoteList from './pages/NoteList';

export default function App() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content style={styles.headerText} title="My Dream Journal" />
      </Appbar.Header>
      <NoteList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background
  },
  appBar: {
    backgroundColor: COLORS.secondary,
    color: '#ffffffaa'
  },
  headerText: {
    color: '#ffffffaa'
  }
});
