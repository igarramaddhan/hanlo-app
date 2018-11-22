import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import FriendController from '../controllers/FriendController';
import { color } from '../libs/metrics';
import { SearchBar } from 'antd-mobile-rn';

type Props = {};
type State = {};

export default class Friend extends Component<Props, State> {
  state = {
    friends: [],
    loading: true,
    search: '',
    filteredFriends: [],
    searchBarFocus: false
  };

  async componentDidMount() {
    await this.getAllFriend();
  }

  getAllFriend = async () => {
    const friends = await FriendController.getFriends();
    this.setState({ friends, loading: false });
  };

  search = async (username: string) => {
    await this.setState({ search: username });
    const searchUser = await this.state.friends.filter(val =>
      val.username.toLowerCase().includes(username.toLowerCase())
    );
    await this.setState({ filteredFriends: searchUser });
  };

  renderIcon = () => {
    const icon = this.state.searchBarFocus ? (
      <Icon
        name="close"
        size={24}
        onPress={() => {
          this.searchBar.blur();
          this.setState({ searchBarFocus: false, search: '' });
        }}
      />
    ) : (
      <Icon
        name="plus"
        size={24}
        onPress={() => {
          this.props.navigation.navigate('AddFriend', {
            refresh: this.getAllFriend
          });
        }}
      />
    );
    return icon;
  };

  render() {
    const { filteredFriends, friends, loading, search } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            ref={ref => (this.searchBar = ref)}
            placeholder="Type username here..."
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.search}
            onChangeText={this.search}
            onFocus={() => this.setState({ searchBarFocus: true })}
            onBlur={() => this.setState({ searchBarFocus: false })}
          />
          {this.renderIcon()}
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <FlatList
            data={search === '' ? friends : filteredFriends}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() =>
                  this.props.navigation.navigate('FriendProfile', {
                    user: item
                  })
                }
              >
                <View style={styles.friendList}>
                  <Text>{item.displayName}</Text>
                  <Text style={styles.username}>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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
  },
  friendList: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 1
  },
  username: {
    color: 'grey',
    fontSize: 11
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    // position: 'absolute',
    // bottom: 0,
    elevation: 3,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginRight: 4
  },
  sendButton: {
    paddingHorizontal: 10,
    paddingBottom: 4,
    justifyContent: 'flex-end'
  }
});
