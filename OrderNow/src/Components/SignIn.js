import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput
} from 'react-native';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: '', 
        password: ''
    };
  }

  render() {
    const { username, password } = this.state;
    const { navigate } = this.props.navigation;
    const { container, textInput, btnChange, btnText } = styles;
    return (
      <View style={container}>
        <View>
          <TextInput
              style={textInput}
              placeholder="Enter your username"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={username}
              onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Enter your password"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={password}
              onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity 
              style={btnChange}
              onPress={() => navigate('Screen_AppOrderNow')}
          >
              <Text style={btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 300,
    height: 45,
    marginHorizontal: 20,
    backgroundColor: 'whitesmoke',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  btnChange: {
    width: 300,
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    color: 'whitesmoke', 
    fontWeight: '600', 
    paddingHorizontal: 20
  },
});
