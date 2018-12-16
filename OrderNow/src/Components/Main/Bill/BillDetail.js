import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { filterFinishedFoodByTable, updateStatusBillDetail } from './../../../Database/All_Schemas';

import HeaderBack from './../HeaderBack';
import getFormattedMoney from './../../../Api/FormattedMoney';

let checkActiveIcon = require('./../../../Media/Icon/check-active.png');

const { width, height } = Dimensions.get("window");

export default class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFinishFood: []
    };
    this.onReloadData();
    realm.addListener('change', () => {
      this.onReloadData();
    });
  }

  onReloadData() {
    filterFinishedFoodByTable(this.props.navigation.state.params.table)
    .then(listFinishFood => this.setState({ listFinishFood }))
    .catch(error => this.setState({ listFinishFood: [] }));
  }

  onUnfinishedFood(item) {
    updateStatusBillDetail(item.billDetail, false)
    .then(() => alert(`${item.food.name} chưa hoàn thành`))
    .catch(error => alert('Món ăn bị lỗi!'));
  }

  render() {
    const { listFinishFood } = this.state;
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


          <FlatList
            data={listFinishFood}
            renderItem={({item}) => 
              <View style={wrapItem}>
                <TouchableOpacity
                  style={btnCheck}
                  onPress={() => this.onUnfinishedFood(item)}
                >
                  <Image source={checkActiveIcon}></Image>
                </TouchableOpacity>
                <View style={txtTen}>
                  <Text>{item.food.name}</Text>
                </View>              
                <View style={txtDonGia}>
                  <Text>{item.food.price.getFormattedMoney(0)}</Text>
                </View>              
                <View style={txtSoLuong}>
                  <Text >{item.billDetail.quantity}</Text>
                </View>
                <View style={txtTriGia}>                            
                <Text>{(item.food.price * item.billDetail.quantity).getFormattedMoney(0)}</Text>
                </View>
              </View>  
            }
            keyExtractor={item => item.billDetail.id.toString()}
          />

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
  txtTen: { flex: 8, marginHorizontal: 5 },
  txtDonGia: { flex: 5, alignItems: 'center' },
  txtSoLuong: { flex: 5, alignItems: 'center' },
  txtTriGia: { flex: 5, alignItems: 'center' }
});
