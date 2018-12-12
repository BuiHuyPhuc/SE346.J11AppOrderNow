import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput
} from 'react-native';

import HeaderBack from './../../Main/HeaderBack';

export default class Info extends Component {
  constructor(props) {
    super(props);
    //const { name, address, phone } = this.props.navigation.state.params.user;
    this.state = { 
        txtTen: 'Bùi Huy Phúc', 
        txtSdt: '0914.659.369',
        txtCa: '1' 
    };
  }

  render() {
    const { txtTen, txtSdt, txtCa } = this.state;
    const { navigation } = this.props;
    const { container, wrapper, textInput, btnChange, btnText } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Info User"
        />

        <View style={wrapper}>
          <TextInput
              style={textInput}
              placeholder="Enter your name"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={txtTen}
              onChangeText={text => this.setState({ ...this.state, txtTen: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Enter your phone number"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={txtSdt}
              onChangeText={text => this.setState({ ...this.state, txtSdt: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Enter your shift"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={txtCa}
              onChangeText={text => this.setState({ ...this.state, txtCa: text })}
          />
          <TouchableOpacity 
              style={btnChange}
              onPress={() => {}}
          >
              <Text style={btnText}>Change your infomation</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 10,
    justifyContent: 'center' 
  },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: 'whitesmoke',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  btnChange: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
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
