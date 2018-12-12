import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput
} from 'react-native';

import HeaderBack from './../HeaderBack';

const { width, height } = Dimensions.get("window");

let sortUpIcon = require('./../../../Media/Icon/sort-up.png');
let sortDownIcon = require('./../../../Media/Icon/sort-down.png');

export default class MgnTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
        search: ''
    };
  }
  
  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature             
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Management Table"
        />        
        
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => this.setState({ search: text })}
          />
          <View style={wrapFeature}>
            <TouchableOpacity
              style={btnFeature}
              onPress={() => {}}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View> 
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ---> Header <---
  wrapHeader: {
    paddingHorizontal: 10
  },
  inputSearch: {
    width: width - 20,
    height: height / 16,
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginVertical: 5
  },
  wrapFeature: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  }
});
