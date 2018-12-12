import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput
} from 'react-native';

const { width, height } = Dimensions.get("window");

let checkInactiveIcon = require('./../../../Media/Icon/check-inactive.png');

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            wrapTable, headerTable, headerWrapTen, headerWrapSoLuong, headerWrapBan, headerWrapThoiGian, txtHeader, 
            wrapItem, btnCheck, txtTen,txtSoLuong, txtBan, txtThoiGian
          } = styles;
    return (
      <View style={container}>
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

        <View style={wrapTable}>
          <View style={headerTable}>
            <View style={headerWrapTen}>
              <TouchableOpacity 
                onPress={() => {}}>                
                <Text style={txtHeader}>Tên món</Text>
              </TouchableOpacity>              
            </View>
            <View style={headerWrapSoLuong}>
              <TouchableOpacity 
                onPress={() => {}}>
                <Text style={txtHeader}>Số lượng</Text>
              </TouchableOpacity>              
            </View>
            <View style={headerWrapBan}>
              <TouchableOpacity 
                onPress={() => {}}>
                <Text style={txtHeader}>Bàn</Text>
              </TouchableOpacity>              
            </View>
            <View style={headerWrapThoiGian}>
              <TouchableOpacity 
                onPress={() => {}}>
                <Text style={txtHeader}>Thời gian</Text>
              </TouchableOpacity>              
            </View>            
          </View>

          <View>
            <View style={wrapItem}>
              <TouchableOpacity
                style={btnCheck}
                onPress={() => {}}
              >
                <Image source={checkInactiveIcon}></Image>
              </TouchableOpacity>
              <View style={txtTen}>
                <Text>Sụn gà cháy tỏi gà cháy tỏi</Text>
              </View>
              <View style={txtSoLuong}>
                <Text>2</Text>
              </View>
              <View style={txtBan}>
                <Text>1</Text>
              </View>       
              <View style={txtThoiGian}>
                <Text>12:20</Text>
              </View>
            </View>            
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  // ---> Table Header <---
  wrapTable: {
    paddingHorizontal: 5,
    marginTop: 10 
  },
  headerTable: {
    flexDirection: 'row'
  },
  headerWrapTen: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  headerWrapSoLuong: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapBan: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapThoiGian: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold', 
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center' 
  },
  btnCheck: { flex: 2, alignItems: 'center' },
  txtTen: { flex: 7, alignItems: 'center' },
  txtSoLuong: { flex: 6, alignItems: 'center' },
  txtBan: { flex: 3, alignItems: 'center' },
  txtThoiGian: { flex: 6, alignItems: 'center' }
});
