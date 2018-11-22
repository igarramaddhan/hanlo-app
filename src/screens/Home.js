import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react';
import { Button } from 'antd-mobile-rn';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import UserStore from '../stores/UserStore';
import PostController from '../controllers/PostController';
import { color } from '../libs/metrics';
import PostItem from '../components/PostItem';
import Header from '../components/Header';

type Props = {};
type State = {};

@observer
export default class Home extends Component<Props, State> {
  state = {
    posts: [],
    isLoading: true,
    refreshing: false
  };

  async componentDidMount() {
    await this.getList();
  }

  setToken = () => {
    UserStore.setToken('this is your token');
    // this.props.userStore.setToken('Thialskjdflaskfdj');
  };

  getList = async () => {
    const posts = await PostController.getPosts();
    this.setState({ posts: posts, isLoading: false });
  };

  render() {
    const { posts, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Header style={{ elevation: 3 }} isBack={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Home</Text>
            <Icon
              size={25}
              name="plus"
              onPress={() =>
                this.props.navigation.navigate('AddPost', {
                  refresh: this.getList
                })
              }
            />
          </View>
        </Header>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator color={color.primary} size="large" />
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.getList()}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  }
});
