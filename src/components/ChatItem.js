import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 1
  },
  usernameText: {
    fontWeight: 'bold',
    color: 'black'
  },
  timeText: {
    fontSize: 11,
    color: 'grey',
    marginBottom: 8
  },
  commentsText: {
    fontSize: 12,
    textAlign: 'right'
  }
});

type Props = {
  onPress?: () => void,
  disabled?: boolean
};
const ChatItem = (props: Props) => {
  const chat = props.chat;
  let date = moment(chat[chat.length - 1].createdAt);
  date = moment(date).toNow();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.usernameText}>{props.user[0].displayName}</Text>
          <Text style={styles.timeText}>{date.toString()}</Text>
        </View>
        <Text>{chat[chat.length - 1].content}</Text>
      </View>
    </TouchableOpacity>
  );
};

ChatItem.defaultProps = {
  onPress: () => {},
  disabled: false
};
export default ChatItem;
