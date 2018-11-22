import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TextInput
} from 'react-native';
import { NoticeBar } from 'antd-mobile-rn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

type Props = {
  required?: boolean,
  inputRef?: ref => void
};
class Input extends Component<Props & TextInputProps> {
  state = {
    valid: true
  };
  render() {
    return (
      <>
        <TextInput
          {...this.props}
          ref={ref => this.props.inputRef(ref)}
          style={{ backgroundColor: '#f2f2f2' }}
          borderRadius={3}
          padding={10}
          marginVertical={5}
          underlineColorAndroid="transparent"
          onSubmitEditing={() => {
            if (this.props.required) {
              if (this.props.value === '' || !this.props.value) {
                this.setState({ valid: false });
              } else {
                this.setState({ valid: true });
                this.props.onSubmitEditing();
              }
            } else {
              this.props.onSubmitEditing();
            }
          }}
        />
        {!this.state.valid && (
          <NoticeBar
            style={{ marginTop: 2, marginBottom: 8 }}
            icon={null}
            marqueeProps={{
              loop: true,
              style: { fontSize: 12, color: 'red' }
            }}
          >
            {this.props.placeholder} is required!
          </NoticeBar>
        )}
      </>
    );
  }
}

Input.defaultProps = {
  inputRef: ref => {},
  required: false
};
export default Input;
