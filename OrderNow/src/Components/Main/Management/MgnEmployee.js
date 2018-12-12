import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput
} from 'react-native';

import HeaderBack from './../HeaderBack';

const { width, height } = Dimensions.get("window");

export default class MgnEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            wrapTable, headerTable, headerWrapChucVu, headerWrapTen, headerWrapSdt, txtHeader,
            wrapItem, txtChucVu, txtTen, txtSdt 
          } = styles;
    return (
      <View style={ container }>
      <HeaderBack
          navigation={navigation}
          name="Management Employee"
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

        <View style={wrapTable}>
          <View style={headerTable}>
            <View style={headerWrapChucVu}>
              <TouchableOpacity 
                onPress={() => {}}>                
                <Text style={txtHeader}>Chức vụ</Text>
              </TouchableOpacity>              
            </View>
            <View style={headerWrapTen}>
              <TouchableOpacity 
                onPress={() => {}}>                
                <Text style={txtHeader}>Tên nhân viên</Text>
              </TouchableOpacity>              
            </View>            
            <View style={headerWrapSdt}>
              <TouchableOpacity 
                onPress={() => {}}>                
                <Text style={txtHeader}>Số điện thoại</Text>
              </TouchableOpacity>              
            </View>           
          </View>

          <View>
            <View style={wrapItem}>
              <View style={txtChucVu}>
                <Text>Quản lý</Text>
              </View>
              <View style={txtTen}>
                <Text>Bùi Huy Phúc</Text>
              </View>
              <View style={txtSdt}>
                <Text>0914659369</Text>
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
  headerWrapChucVu: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapTen: { flex: 4, justifyContent: 'center', alignItems: 'center' },
  headerWrapSdt: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold', 
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtChucVu: { flex: 2, alignItems: 'center' },
  txtTen: { flex: 4, alignItems: 'center' },
  txtSdt: { flex: 3, alignItems: 'center' },
});
