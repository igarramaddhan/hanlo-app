import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Toast } from 'antd-mobile-rn';

import Header from '../components/Header';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import PostController from '../controllers/PostController';

type Props = {};
type State = {};

export default class AddPost extends Component<Props, State> {
  state = {
    post: '',
    loading: false
  };

  addPost = async () => {
    this.setState({ loading: true });
    const result = await PostController.addPost(this.state.post);
    if (result) {
      await this.props.navigation.state.params.refresh();
      this.props.navigation.goBack();
    } else {
      this.setState({ loading: false });
      Toast.fail('Failed');
    }
  };

  render() {
    const { loading, post } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Input
            required
            value={post}
            placeholder="Write something here ...."
            onChangeText={text => this.setState({ post: text })}
            multiline
          />
          <CustomButton
            text="Add Post"
            disabled={post === ''}
            onPress={this.addPost}
            loading={loading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  content: {
    padding: 8,
    margin: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 3
  }
});
