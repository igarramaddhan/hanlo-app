import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { observer } from 'mobx-react';

import ChatBubble from '../components/ChatBubble';
import { color, IS_IOS } from '../libs/metrics';
import ChatController from '../controllers/ChatController';
import CurrentMessageStore from '../stores/CurrentMessageStore';
import Header from '../components/Header';

type Props = { navigation: NavigationScreenProp };
type State = {
  user: Object,
  ticketId: string,
  messages: Array<any>,
  message: string,
  loading: boolean,
  knowledgeVisible: boolean,
  initialLoad: boolean
};

@observer
export default class ChatDetail extends Component<Props, State> {
  state = {
    user: null,
    ticketId: null,
    messages: [],
    message: '',
    loading: false,
    knowledgeVisible: false,
    initialLoad: true
  };

  static getDerivedStateFromProps = (props, state) => {
    const res = props.navigation.getParam('item');
    const user = res.user[0];
    return { user: user };
  };

  async componentDidMount() {
    this.setState({ initialLoad: false });
  }

  refresh = async () => {
    const { user } = this.state;
    await this.props.navigation.state.params.refresh(user.id);
  };

  async sendMessage() {
    const { user, message } = this.state;
    this.setState({ loading: true });
    await ChatController.sendMessage(user.id, message);
    await this.refresh();
    this.setState({ loading: false, message: '' });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={IS_IOS ? 85 : 23}
        >
          <View style={{ height: '100%' }}>
            <Header>
              <View style={styles.header}>
                <Text>{this.state.user.displayName}</Text>
                <Icon size={25} name="reload" onPress={this.refresh} />
              </View>
            </Header>
            {this.state.initialLoad ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ActivityIndicator size="large" color={color.primary} />
              </View>
            ) : (
              <React.Fragment>
                <View style={{ flex: 1 }}>
                  <View style={styles.messageContent}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      inverted
                      contentContainerStyle={{
                        padding: 10
                      }}
                      keyExtractor={item => item.id.toString()}
                      data={CurrentMessageStore.messages}
                      renderItem={({ item }) => (
                        <ChatBubble
                          message={item.content}
                          isMe={this.state.user.id !== item.from}
                          time={item.createdAt}
                          isOtherDay={item.isOtherDay}
                          // sending={item.status === 'sending'}
                          // failed={item.status === 'failed'}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    multiline
                    placeholder="Write something here..."
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    value={this.state.message}
                    onChangeText={text => this.setState({ message: text })}
                  />

                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={
                      this.state.message !== ''
                        ? () => this.sendMessage()
                        : () => {}
                    }
                  >
                    {this.state.loading ? (
                      <ActivityIndicator
                        style={{ height: 24 }}
                        color={color.primary}
                      />
                    ) : (
                      <Icon
                        name="send"
                        size={24}
                        color={
                          this.state.message === '' ? '#eee' : color.primary
                        }
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </View>
        </KeyboardAvoidingView>
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
    paddingBottom: 4,
    justifyContent: 'flex-end'
  },
  messageContent: {
    // marginBottom: 48
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  }
});
