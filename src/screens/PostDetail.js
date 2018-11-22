import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import IconMaterial from '@expo/vector-icons/MaterialCommunityIcons';
import PostItem from '../components/PostItem';
import CommentItem from '../components/CommentItem';
import { color, IS_IOS } from '../libs/metrics';
import Header from '../components/Header';
import CommentController from '../controllers/CommentController';

type Props = {};
type State = {};

export default class PostDetail extends Component<Props, State> {
  state = {
    postId: null,
    comment: '',
    comments: [],
    loading: false
  };

  async componentDidMount() {
    const data = this.props.navigation.getParam('item');
    await this.setState({ postId: data.id });
    await this.getComments();
  }

  getComments = async () => {
    const comments = await CommentController.getComments(this.state.postId);
    this.setState({ comments: comments.slice().reverse() });
  };

  sendComment = async () => {
    const { postId, comment } = this.state;
    this.setState({ loading: true });
    await CommentController.addComment(postId, comment);
    await this.props.navigation.state.params.refresh();
    await this.getComments();
    this.setState({ comment: '', loading: false });
  };

  render() {
    const data = this.props.navigation.getParam('item');
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View style={{ height: '100%' }}>
          <Header />
          <PostItem disabled {...data} />
          <FlatList
            style={{ marginTop: 8 }}
            showsVerticalScrollIndicator={false}
            data={this.state.comments}
            ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
            renderItem={({ item }) => {
              return <CommentItem {...item} />;
            }}
            keyExtractor={item => item.id.toString()}
          />
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={IS_IOS ? 85 : 23}
          >
            <View style={styles.inputView}>
              <TextInput
                multiline
                placeholder="Write a comment..."
                style={styles.input}
                underlineColorAndroid="transparent"
                value={this.state.comment}
                onChangeText={text => this.setState({ comment: text })}
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={
                  this.state.message !== '' ? this.sendComment : () => {}
                }
              >
                {this.state.loading ? (
                  <ActivityIndicator
                    style={{ height: 24 }}
                    color={color.primary}
                  />
                ) : (
                  <IconMaterial
                    name="send"
                    size={24}
                    color={this.state.comment === '' ? '#eee' : color.primary}
                    onPress={this.sendComment}
                  />
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    // position: 'absolute',
    // bottom: 0,
    elevation: 10,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f2f2f2',
    borderRadius: 50
  },
  sendButton: {
    paddingHorizontal: 10,
    justifyContent: 'flex-end'
  },
  messageContent: {
    // marginBottom: 48
  }
});
