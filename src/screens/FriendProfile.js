import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { color } from '../libs/metrics';
import PostItem from '../components/PostItem';
import PostController from '../controllers/PostController';
import CurrentMessageStore from '../stores/CurrentMessageStore';
import ChatController from '../controllers/ChatController';

type Props = {};
type State = {};

export default class FriendProfile extends Component<Props, State> {
  static getDerivedStateFromProps(props, state) {
    const user = props.navigation.getParam('user');
    if (user)
      return {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        isFriend: user.isFriend
      };
    return null;
  }
  state = {
    id: null,
    username: '',
    displayName: '',
    isFriend: false,
    posts: [],
    isLoading: true,
    chat: null
  };

  async componentDidMount() {
    await this.getUserChat();
    await this.getList();
  }

  getList = async () => {
    const posts = await PostController.getUserPosts(this.state.id);
    this.setState({ posts: posts, isLoading: false });
  };

  getUserChat = async () => {
    const chat = await ChatController.getUserMessages(this.state.id);
    this.setState({ chat });
  };

  refreshChatList = async id => {
    await this.getUserChat();
    CurrentMessageStore.setCurrentMessage(this.state.chat.chat);
  };

  navigateToChat = () => {
    let item = this.state.chat;
    const { displayName, id, username } = this.state;
    if (!item) {
      item = {
        user: [
          {
            displayName,
            id,
            username
          }
        ],
        chat: []
      };
    }
    CurrentMessageStore.setCurrentMessage(item.chat);
    this.props.navigation.navigate('ChatDetail', {
      item,
      refresh: this.refreshChatList
    });
  };

  render() {
    const {
      id,
      username,
      displayName,
      isFriend,
      isLoading,
      posts,
      chat
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ padding: 8 }}>
          <View style={styles.horizontal}>
            <Text style={styles.text}>Display Name</Text>
            <Text style={styles.text}>{displayName}</Text>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.text}>Username</Text>
            <Text style={styles.text}>{username}</Text>
          </View>
          <View style={[styles.horizontal, { justifyContent: 'flex-start' }]}>
            {!isFriend && (
              <View style={{ flex: 1, paddingRight: 4 }}>
                <CustomButton text="Add" />
              </View>
            )}
            <View style={{ flex: 1, paddingLeft: 4 }}>
              <CustomButton text="Chat" onPress={this.navigateToChat} />
            </View>
          </View>
        </View>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator color={color.primary} size="large" />
          </View>
        ) : (
          <>
            <Text style={[styles.text, { margin: 8 }]}>Posts</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={posts}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              renderItem={({ item }) => {
                return (
                  <PostItem
                    {...item}
                    onPress={() =>
                      this.props.navigation.navigate('PostDetail', {
                        item,
                        refresh: this.getList
                      })
                    }
                  />
                );
              }}
              keyExtractor={item => item.id.toString()}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  text: {
    fontSize: 18
  }
});
