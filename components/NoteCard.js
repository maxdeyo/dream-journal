import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

import {COLORS} from '../assets/colors';



export default function NoteCard({ item, onPress, style, deleteNote }){
    const [deleteCard, toggleDeleteCard] = React.useState(false);
    const onLongPress = () => {
      toggleDeleteCard(!deleteCard);
    }
    return(
    <Pressable 
        onPress={deleteCard ? null : onPress} 
        style={styles.item}
        onLongPress={onLongPress}
        >
            <Card style={styles.cardStyle}>
                <View style={styles.cardText}>
                    <Text style={styles.title}>{item.id} {item.title}</Text>
                    <Text style={styles.text} numberOfLines={1}>{item.text}</Text>
                </View>
                {
                  deleteCard ?
                  <Card.Actions>
                    <Button
                      onPress={onPress}
                    >Edit</Button>
                    <Button
                      onPress={()=>deleteNote(item.id)}
                    >Delete</Button>
                  </Card.Actions>
                  : null
                }
            </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
        backgroundColor: COLORS.tertiary,
        elevation: 10,
        shadowColor: '#888888'
      },
      cardText: {
        justifyContent: 'center',
        fontWeight: '200',
        color: COLORS.text
      },
      deleteCardText: {
        flex: 1,
        height: '100%',
        color: COLORS.background,
        backgroundColor: COLORS.emergency,

      },
      deleteCardStyle: {
        flex: 1,
        padding: 25,
        backgroundColor: COLORS.tertiary,
        elevation: 10,
        shadowColor: '#888888'
      }
});