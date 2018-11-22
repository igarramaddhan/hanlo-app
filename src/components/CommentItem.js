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
    color: 'black',
    marginRight: 4
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
const CommentItem = (props: Props) => {
  let date = moment(props.createdAt);
  date = moment(date).fromNow();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.usernameText}>{props.User.username}</Text>
        <Text>{props.content}</Text>
      </View>
      <Text style={styles.timeText}>{date}</Text>
    </View>
  );
};

CommentItem.defaultProps = {
  onPress: () => {},
  disabled: false
};
export default CommentItem;
