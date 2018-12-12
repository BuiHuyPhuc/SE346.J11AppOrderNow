import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, Image
} from 'react-native';

import rightIcon from './../../../Media/Icon/right.png';

const { width, height } = Dimensions.get("window");

export default class Management extends Component {
  render() {
    const { navigation } = this.props;
    const { container, wrapperManagementItem, btnManagementItem, txtManagementItem } = styles;
    return (
      <View style={container}>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem} 
            onPress={() => navigation.navigate('Screen_Mng_Employee')}
          >
            <Text style={txtManagementItem}>Management Employee</Text>
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem} 
            onPress={() => navigation.navigate('Screen_Mng_Table')}
          >
            <Text style={txtManagementItem}>Management Table</Text>
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem} 
            onPress={() => navigation.navigate('Screen_Mng_CategoryFood')}
          >
            <Text style={txtManagementItem}>Management CategoryFood</Text>
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem} 
            onPress={() => navigation.navigate('Screen_Mng_Food')}
          >
            <Text style={txtManagementItem}>Management Food</Text>
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem} 
            onPress={() => navigation.navigate('Screen_Mng_Report')}
          >
            <Text style={txtManagementItem}>Management Report</Text>
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperManagementItem: {
    height: height / 12,
    borderBottomWidth: 1,
    borderBottomColor: "#B0B0B0",
    marginTop: 5
  },
  btnManagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  txtManagementItem: {
    fontSize: 20
  }
});
