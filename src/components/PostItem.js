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
const PostItem = (props: Props) => {
  let date = moment(props.createdAt);
  date = moment(date).fromNow();
  return (
    <TouchableOpacity
      disabled={props.disabled}
      delayPressIn={100}
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.usernameText}>{props.User.username}</Text>
        <Text style={styles.timeText}>{date}</Text>
        <Text>{props.content}</Text>
        <Text style={styles.commentsText}>
          {props.comments.length} comments
        </Text>
      </View>
    </TouchableOpacity>
  );
};

PostItem.defaultProps = {
  onPress: () => {},
  disabled: false
};
export default PostItem;
