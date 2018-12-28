import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { filterFoodByTable, updateStatusBillDetail } from './../../../Database/All_Schemas';

import HeaderBack from './../HeaderBack';
import getFormattedMoney from './../../../Api/FormattedMoney';

let checkInactiveIcon = require('./../../../Media/Icon/check-inactive.png');
let checkActiveIcon = require('./../../../Media/Icon/check-active.png');

const { width, height } = Dimensions.get("window");
var isMouted = false;

export default class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFinishFood: []
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onReloadData() {
    filterFoodByTable(this.props.navigation.state.params.table)
      .then(listFinishFood => this.setState({ listFinishFood }))
      .catch(error => this.setState({ listFinishFood: [] }));
  }

  onUnfinishedFood(item) {
    updateStatusBillDetail(item.billDetail, false)
      .catch(error => alert('Món ăn bị lỗi!'));
  }

  onFinishedFood(item) {
    updateStatusBillDetail(item.billDetail, true)
      .catch(error => alert('Món ăn bị lỗi'));
  }

  render() {
    const { listFinishFood } = this.state;
    const { navigation} = this.props;
    const { table } = this.props.navigation.state.params;
    const { container, headerTable, headerWrapTrangThai, headerWrapTen, headerWrapSoLuong, headerWrapDonGia,
      headerWrapTriGia, txtHeader, textItem,
      wrapItem, btnCheck, imageStyle, txtTen, txtSoLuong, txtDonGia, txtTriGia
    } = styles;
    return (
      <View style={container}>
        <HeaderBack
					navigation={navigation}
					name={"Bàn " + table}
				/>

        <View style={{ margin: 10, paddingVertical: 10, backgroundColor: 'white', elevation: 3, borderRadius: 5 }}>
          <View style={headerTable}>
            <View style={headerWrapTrangThai}>
              <Text style={txtHeader}></Text>
            </View>
            <View style={headerWrapTen}>
              <Text style={txtHeader}>Tên món</Text>
            </View>
            <View style={headerWrapDonGia}>
              <Text style={txtHeader}>Đơn giá</Text>
            </View>
            <View style={headerWrapSoLuong}>
              <Text style={txtHeader}>SL</Text>
            </View>
            <View style={headerWrapTriGia}>
              <Text style={txtHeader}>Trị giá</Text>
            </View>
          </View>

          <FlatList
            data={listFinishFood}
            renderItem={({ item }) =>
              <View style={wrapItem}>
                <TouchableOpacity
                  style={btnCheck}
                  onPress={() => item.billDetail.status ? this.onUnfinishedFood(item) : this.onFinishedFood(item)}
                >
                  <Image style={imageStyle} source={item.billDetail.status ? checkActiveIcon : checkInactiveIcon}></Image>
                </TouchableOpacity>
                <View style={txtTen}>
                  <Text style={textItem}>{item.food.name}</Text>
                </View>
                <View style={txtDonGia}>
                  <Text style={textItem}>{item.food.price.getFormattedMoney(0)}</Text>
                </View>
                <View style={txtSoLuong}>
                  <Text style={textItem}>{item.billDetail.quantity}</Text>
                </View>
                <View style={txtTriGia}>
                  <Text style={textItem}>{(item.food.price * item.billDetail.quantity).getFormattedMoney(0)}</Text>
                </View>
              </View>
            }
            keyExtractor={item => item.billDetail.id.toString()}
          />
        </View>

      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if (isMouted)
        this.onReloadData();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  // ---> Table Header <---
  headerTable: {
    flexDirection: 'row',
    margin: 10
  },
  headerWrapTrangThai: { flex: 1, justifyContent: 'center' },
  headerWrapTen: { flex: 4, justifyContent: 'center' },
  headerWrapDonGia: { flex: 2, justifyContent: 'center' },
  headerWrapSoLuong: { flex: 1, justifyContent: 'center' },
  headerWrapTriGia: { flex: 2, justifyContent: 'center' },
  txtHeader: {
    color: '#fe5644',
    fontWeight: 'bold',
    fontSize: 16
  },
  // ---> Table Item <---
  wrapItem: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-start'
  },
  btnCheck: {
    flex: 1,
  },
  imageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  txtTen: { flex: 4 },
  txtDonGia: { flex: 2 },
  txtSoLuong: { flex: 1 },
  txtTriGia: { flex: 2 },
  txtItem: {
    color: 'black',
    flexWrap: 'wrap',
    fontSize: 14
  },
});
