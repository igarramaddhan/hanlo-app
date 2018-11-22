import React, { Component } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import NavigationService from '../libs/NavigationService';

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 12,
    flexDirection: 'row'
  }
});

type Props = {
  isBack?: boolean,
  style?: StyleProp<ViewStyle>
};
const Header = (props: Props) => {
  return (
    <View style={[styles.container, { ...props.style }]}>
      {props.isBack && (
        <Icon
          name="arrow-left"
          size={25}
          style={{ marginRight: 16 }}
          onPress={() => NavigationService.goBack()}
        />
      )}
      {props.children}
    </View>
  );
};

Header.defaultProps = {
  isBack: true
};
export default Header;
