import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import CustomButton from '../components/CustomButton';
import UserController from '../controllers/UserController';
import { color } from '../libs/metrics';
import PostItem from '../components/PostItem';

type Props = {};
type State = {};

export default class Profile extends Component<Props, State> {
  state = {
    isLoading: true,
    displayName: '',
    username: '',
    posts: []
  };

  componentDidMount = async () => {
    const res = await UserController.me();
    const { displayName, username, posts } = res;
    this.setState({
      isLoading: false,
      username,
      displayName,
      posts: posts.slice().reverse()
    });
  };

  logout = async () => {
    await UserController.logout();
    this.props.navigation.navigate('Splash');
  };

  render() {
    const {
      displayName,
      username,

      isLoading,
      posts
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View>
              <View style={styles.horizontal}>
                <Text style={styles.text}>Display Name</Text>
                <Text style={styles.text}>{displayName}</Text>
              </View>
              <View style={styles.horizontal}>
                <Text style={styles.text}>Username</Text>
                <Text style={styles.text}>{username}</Text>
              </View>
            </View>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
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
                            refresh: this.componentDidMount
                          })
                        }
                      />
                    );
                  }}
                  keyExtractor={item => item.id.toString()}
                />
              </>
            )}
            <CustomButton onPress={this.logout} text="Logout" color="red" />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 25,
    padding: 8
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
