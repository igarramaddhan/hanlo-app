import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { observer } from 'mobx-react';

import ChatController from '../controllers/ChatController';
import { color } from '../libs/metrics';
import ChatItem from '../components/ChatItem';
import CurrentMessageStore from '../stores/CurrentMessageStore';

type Props = {};
type State = {};

@observer
export default class Chat extends Component<Props, State> {
  state = {
    chats: [],
    isLoading: true,
    refreshing: false
  };

  async componentDidMount() {
    await this.getMessages();
  }

  getMessages = async () => {
    const chats = await ChatController.getMessages();
    let sort = [...chats].sort((a, b) => {
      return (
        new Date(b.chat[b.chat.length - 1].createdAt) -
        new Date(a.chat[a.chat.length - 1].createdAt)
      );
    });
    this.setState({ chats: sort, isLoading: false });
  };

  refreshChatList = async id => {
    await this.getMessages();
    const current = this.state.chats.find(val => val.user[0].id === id);
    CurrentMessageStore.setCurrentMessage(current.chat.reverse());
  };

  refresh = async () => {
    this.setState({ refreshing: true });
    await this.getMessages();
    this.setState({ refreshing: false });
  };

  render() {
    const { isLoading, chats } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator color={color.primary} size="large" />
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.getMessages()}
            data={this.state.chats}
            renderItem={({ item }) => (
              <ChatItem
                {...item}
                onPress={() => {
                  CurrentMessageStore.setCurrentMessage(item.chat.reverse());
                  this.props.navigation.navigate('ChatDetail', {
                    item,
                    refresh: this.refreshChatList
                  });
                }}
              />
            )}
            keyExtractor={item => item.user[0].id.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  }
});
