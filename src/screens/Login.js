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

export default class Login extends Component<Props, State> {
  state = {
    isLoading: false,
    username: '',
    password: ''
  };

  login = async () => {
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    const result = await UserController.login(username, password);
    this.setState({ isLoading: false });

    //on result
    if (result.error !== '') Toast.fail(result.error, 1, undefined, false);
    else this.props.navigation.navigate('Main');
  };

  render() {
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.label}>Login</Text>
          <Input
            required
            value={username}
            placeholder="Username"
            onChangeText={text => this.setState({ username: text })}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          />
          <Input
            value={password}
            required
            inputRef={input => {
              this.secondTextInput = input;
            }}
            onSubmitEditing={this.login}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <CustomButton
            text="Login"
            disabled={username === '' || password === ''}
            onPress={this.login}
            loading={this.state.isLoading}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
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
  },
  registerText: {
    color: color.primary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16
  }
});
