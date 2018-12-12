import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions
} from 'react-native';

import HeaderBack from './../HeaderBack';

let checkActiveIcon = require('./../../../Media/Icon/check-active.png');

const { width, height } = Dimensions.get("window");

export default class BillDetail extends Component {
  render() {
    const { navigation } = this.props;
    const { container, wrapTable, wrapHeaderTable, headerTen, headerDonGia, headerSoLuong, headerTriGia, txtHeader,
            wrapItem, btnCheck, txtTen, txtDonGia, txtSoLuong, txtTriGia 
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Bill Detail tên bàn"
        />

        <View style={wrapTable}>
        
          <View style={wrapHeaderTable}>
            <View style={headerTen}>
              <Text style={txtHeader}>Tên món</Text>             
            </View>
            <View style={headerDonGia}>
              <Text style={txtHeader}>Đơn giá</Text>             
            </View>
            <View style={headerSoLuong}>
              <Text style={txtHeader}>Số lượng</Text>              
            </View> 
            <View style={headerTriGia}>
              <Text style={txtHeader}>Trị giá</Text>              
            </View>           
          </View>

          <View>
            <View style={wrapItem}>
              <TouchableOpacity
                style={btnCheck}
                onPress={() => {}}
              >
                <Image source={checkActiveIcon}></Image>
              </TouchableOpacity>
              <View style={txtTen}>
                <Text>Sụn gà cháy tỏi gà cháy tỏi</Text>
              </View>              
              <View style={txtDonGia}>
                <Text>80.000</Text>
              </View>              
              <View style={txtSoLuong}>
                <Text >1</Text>
              </View>
              <View style={txtTriGia}>                            
              <Text>80.000</Text>
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
  // ---> Table Header <---
  wrapTable: {
    flex: 4,
    padding: 5 
  },
  wrapHeaderTable: {
    flexDirection: 'row'
  },
  headerTen: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerDonGia: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerSoLuong: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTriGia: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtHeader: {
    fontWeight: 'bold'
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row', 
    marginTop: 5, 
    alignItems: 'center' 
  },
  btnCheck: { flex: 2 },
  txtTen: { flex: 8, alignItems: 'center' },
  txtDonGia: { flex: 5, alignItems: 'center' },
  txtSoLuong: { flex: 5, alignItems: 'center' },
  txtTriGia: { flex: 5, alignItems: 'center' }
});
