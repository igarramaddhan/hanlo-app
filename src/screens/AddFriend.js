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
import UserController from '../controllers/UserController';

type Props = {};
type State = {};

export default class AddFriend extends Component<Props, State> {
  state = {
    users: [],
    loading: false,
    search: '',
    searchBarFocus: false
  };

  componentDidMount() {
    this.searchBar.focus();
  }

  search = async (username: string) => {
    await this.setState({ search: username, loading: true });
    const searchUser = await UserController.findUser(username);
    await this.setState({
      users: searchUser ? searchUser : [],
      loading: false
    });
  };

  addFriend = async (userId: number) => {
    await FriendController.addFriend(userId);
    this.search(this.state.search);
    this.props.navigation.state.params.refresh();
  };

  render() {
    const { users, loading, search } = this.state;
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
          {search !== '' && (
            <Icon
              name="close"
              size={24}
              onPress={() => {
                this.searchBar.blur();
                this.setState({ searchBarFocus: false, search: '', users: [] });
              }}
            />
          )}
        </View>
        {loading ? (
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 8 }}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : users.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>Type to find user</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.friendList}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() =>
                    this.props.navigation.navigate('FriendProfile', {
                      user: item
                    })
                  }
                >
                  <View style={{ flex: 1 }}>
                    <Text>{item.displayName}</Text>
                    <Text style={styles.username}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
                {!item.isFriend && (
                  <Icon
                    name="plus"
                    size={24}
                    onPress={() => {
                      this.addFriend(item.id);
                    }}
                  />
                )}
              </View>
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
    elevation: 1,
    flexDirection: 'row'
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
