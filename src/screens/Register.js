import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Icon, NoticeBar, Toast } from 'antd-mobile-rn';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import { color } from '../libs/metrics';
import UserController from '../controllers/UserController';

type Props = {};
type State = {};

export default class Register extends Component<Props, State> {
  state = {
    isLoading: false,
    username: '',
    password: '',
    displayName: ''
  };

  register = async () => {
    const { displayName, username, password } = this.state;
    this.setState({ isLoading: true });
    const result = await UserController.register(
      displayName,
      username,
      password
    );
    this.setState({ isLoading: false });

    //on result
    if (result.error !== '') Toast.fail(result.error, 1, undefined, false);
    else this.props.navigation.navigate('Main');
  };

  render() {
    const { displayName, username, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.label}>Register</Text>
          <Input
            required
            value={displayName}
            placeholder="Display Name"
            onChangeText={text => this.setState({ displayName: text })}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          />
          <Input
            required
            inputRef={input => {
              this.secondTextInput = input;
            }}
            value={username}
            placeholder="Username"
            onChangeText={text => this.setState({ username: text })}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }}
          />
          <Input
            value={password}
            required
            inputRef={input => {
              this.thirdTextInput = input;
            }}
            onSubmitEditing={this.register}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <CustomButton
            text="Register"
            disabled={username === '' || password === '' || displayName === ''}
            onPress={this.register}
            loading={this.state.isLoading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center'
  },
  content: {
    minHeight: 200,
    margin: 8,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 16,
    justifyContent: 'center',
    borderRadius: 3
  },
  label: {
    color: color.primary,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8
  }
});
