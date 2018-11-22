import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import { Toast } from 'antd-mobile-rn';

import Navigation from './src/Navigation';
import NavigationService from './src/libs/NavigationService';

NetInfo.getConnectionInfo().then(connectionInfo => {
  if (
    connectionInfo.type.toLowerCase() === 'none' ||
    connectionInfo.type.toLowerCase() === 'unknown'
  ) {
    Toast.offline('You are offline');
  }
});
function handleFirstConnectivityChange(connectionInfo) {
  if (
    connectionInfo.type.toLowerCase() === 'none' ||
    connectionInfo.type.toLowerCase() === 'unknown'
  ) {
    Toast.offline('You are offline');
  }
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.addEventListener('connectionChange', handleFirstConnectivityChange);

export default class App extends React.Component {
  render() {
    return (
      <Navigation
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
