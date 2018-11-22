import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  NetInfo
} from 'react-native';
import { Font } from 'expo';
import { readLocalAuthToken } from '../libs/api';

type Props = {};
type State = {};

export default class extends Component<Props, State> {
  state = {};

  componentDidMount() {
    Font.loadAsync({
      anticon: require('../../assets/fonts/iconfont.ttf')
    }).then(async () => {
      const token = await readLocalAuthToken();
      if (token) {
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
