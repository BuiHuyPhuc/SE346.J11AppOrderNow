import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, Image
} from 'react-native';

import rightIcon from './../../../Media/Icon/right.png';
import qlnhanvien from './../../../Media/Icon/qlnhanvien.png';
import qlban from './../../../Media/Icon/qlban.png';
import qlloaimonan from './../../../Media/Icon/qlloaimonan.png';
import qlmonan from './../../../Media/Icon/qlmonan.png';
import qlbaocao from './../../../Media/Icon/qlbaocao.png';


const { width, height } = Dimensions.get("window");

export default class Management extends Component {
  render() {
    const { navigation } = this.props;
    const { container, wrapperManagementItem, btnManagementItem, txtManagementItem, imageStyle, imgRight } = styles;
    return (
      <View style={container}>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem}
            onPress={() => navigation.navigate('Screen_Mng_Employee')}
          >
            <Image source={qlnhanvien} style={imageStyle} />
            <Text style={txtManagementItem}>Quản lý nhân viên</Text>
            <Image source={rightIcon} style={imgRight} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem}
            onPress={() => navigation.navigate('Screen_Mng_Table')}
          >
            <Image source={qlban} style={imageStyle} />
            <Text style={txtManagementItem}>Quản lý bàn</Text>
            <Image source={rightIcon} style={imgRight} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem}
            onPress={() => navigation.navigate('Screen_Mng_CategoryFood')}
          >
            <Image source={qlloaimonan} style={imageStyle} />
            <Text style={txtManagementItem}>Quản lý loại món ăn</Text>
            <Image source={rightIcon} style={imgRight} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem}
            onPress={() => navigation.navigate('Screen_Mng_Food')}
          >
            <Image source={qlmonan} style={imageStyle} />
            <Text style={txtManagementItem}>Quản lý món ăn</Text>
            <Image source={rightIcon} style={imgRight} />
          </TouchableOpacity>
        </View>

        <View style={wrapperManagementItem}>
          <TouchableOpacity
            style={btnManagementItem}
            onPress={() => navigation.navigate('Screen_Mng_Report')}
          >
            <Image source={qlbaocao} style={imageStyle} />
            <Text style={txtManagementItem}>Báo cáo, thống kê</Text>
            <Image source={rightIcon} style={imgRight} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 10
  },
  wrapperManagementItem: {
    height: height / 12,
    margin: 10,
    padding: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center'
  },
  btnManagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtManagementItem: {
    fontSize: 16,
    color: 'black'
  },
  imgRight: {
    resizeMode: 'center',
    width: height / 30,
    height: height / 30,
  },
  imageStyle:{
    resizeMode: 'center',
    width: height / 28,
    height: height / 28,
    tintColor:'#fe5644'
  }

});
