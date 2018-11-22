import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  ActivityIndicator
} from 'react-native';
import { color } from '../libs/metrics';

type Props = {
  color?: string,
  onPress: Function,
  disabled?: boolean,
  text?: string,
  loading?: boolean
};
type State = {};

export default class CustomButton extends Component<Props, State> {
  state = {};
  buttonValue = new Animated.Value(1);

  onPress = (type: 'in' | 'out') => {
    Animated.timing(this.buttonValue, {
      toValue: type === 'in' ? 0 : 1,
      duration: 300,
      easing: Easing.bounce
    }).start();
  };

  onClick = async () => {
    await this.onPress('in');
    this.onPress('out');
  };

  render() {
    const scaleButton = this.buttonValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.97, 1]
    });
    return (
      <TouchableWithoutFeedback
        onPressIn={() => (!this.props.disabled ? this.onPress('in') : {})}
        onPressOut={() => (!this.props.disabled ? this.onPress('out') : {})}
        onPress={!this.props.disabled ? this.props.onPress : () => {}}
      >
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleButton }],
              backgroundColor: this.props.disabled
                ? color.disabled
                : this.props.color
                ? this.props.color
                : color.primary,
              elevation: !this.props.disabled ? 3 : 0
            }
          ]}
        >
          <View style={styles.buttonContent}>
            {this.props.loading && (
              <ActivityIndicator
                style={{ marginRight: 8 }}
                color="white"
                size="small"
              />
            )}
            <Text style={styles.buttonText}>{this.props.text}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    // padding: 16,
    borderRadius: 3,
    // elevation: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
