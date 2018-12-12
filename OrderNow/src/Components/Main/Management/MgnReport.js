import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image
} from 'react-native';

import HeaderBack from './../HeaderBack';

const { width, height } = Dimensions.get("window");

let checkInactiveIcon = require('./../../../Media/Icon/check-inactive.png');
let checkActiveIcon = require('./../../../Media/Icon/check-active.png');

export default class MgnReport extends Component {
  render() {
    const { navigation } = this.props;
    const { container, wrapHeader, spaceComponent,
            wrapTable, headerTable, headerWrapMaHD, headerWrapBan, headerWrapThoiGian, headerWrapTriGia, txtHeader,
            wrapItem, txtMaHD, txtBan, txtThoiGian, txtTriGia, wrapDoanhThu, btnDoanhThu, txtDoanhThu
          } = styles;
    return (
      <View style={ container }>
        <View>
          <HeaderBack 
            navigation={navigation}
            name="Management Report"
          />

          <View style={wrapHeader}>
            <TouchableOpacity
              onPress={() => {}}
            >
              <Image source={checkInactiveIcon}/>
            </TouchableOpacity>
            <Text style={spaceComponent}>Chọn tháng</Text>
            <TouchableOpacity
              onPress={() => {}}
            >
              <Image source={checkActiveIcon}/>
            </TouchableOpacity>
            <Text style={spaceComponent}>Chọn ngày</Text>
          </View>

          <View style={wrapTable}>
            <View style={headerTable}>
              <View style={headerWrapMaHD}>
                <TouchableOpacity 
                  onPress={() => {}}>                
                  <Text style={txtHeader}>Mã HD</Text>
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
              <View style={headerWrapTriGia}>
                <TouchableOpacity 
                  onPress={() => {}}>                
                  <Text style={txtHeader}>Trị giá</Text>
                </TouchableOpacity>              
              </View>           
            </View>

            <View>
              <View style={wrapItem}>
                <View style={txtMaHD}>
                  <Text>1</Text>
                </View>
                <View style={txtBan}>
                  <Text>2</Text>
                </View>
                <View style={txtThoiGian}>
                  <Text>13:29</Text>
                </View>  
                <View style={txtTriGia}>
                  <Text>3.240.000</Text>
                </View>      
              </View>
            </View>  
          </View>
        </View>
        

        <View style={wrapDoanhThu}>
          <Text style={txtDoanhThu}>Doanh thu: $</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  // ---> Header <---
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    marginVertical: 5
  },
  spaceComponent: {
    marginHorizontal: 5
  },
  // ---> Table Header <---
  wrapTable: {
    paddingHorizontal: 5,
    marginTop: 10 
  },
  headerTable: {
    flexDirection: 'row'
  },
  headerWrapMaHD: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapBan: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapThoiGian: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapTriGia: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold'
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtMaHD: { flex: 1, alignItems: 'center' },
  txtBan: { flex: 1, alignItems: 'center' },
  txtThoiGian: { flex: 1, alignItems: 'center' },
  txtTriGia: { flex: 2, alignItems: 'center' },
  // ---> Doanh thu <---
  wrapDoanhThu: {
    padding: 5,
    backgroundColor: '#2ABB9C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtDoanhThu: {
    fontSize: 24
  }
});
