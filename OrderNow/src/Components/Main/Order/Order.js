import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TextInput, FlatList
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { filterUnfinishedFood, updateStatusBillDetail } from './../../../Database/All_Schemas';

import { getFormattedTime } from './../../../Api/FormattedDateTime';

let checkInactiveIcon = require('./../../../Media/Icon/check-inactive.png');

const { width, height } = Dimensions.get("window");
var isMouted = false;

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUnfinishedFood: [],
      search: ''
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onReloadData() {
    filterUnfinishedFood()
      .then(listUnfinishedFood => this.setState({ listUnfinishedFood }))
      .catch(error => this.setState({ listUnfinishedFood: [] }));
  }

  onFinishedFood(item) {
    updateStatusBillDetail(item.billDetail, true)
      .catch(error => alert('Món ăn bị lỗi'));
  }

  onSearch(searchText) {
    filterUnfinishedFood()
      .then(listUnfinishedFood => {
        if (!isNaN(parseInt(searchText)))
          this.setState({ listUnfinishedFood: listUnfinishedFood.filter(item => item.billDetail.idTable === parseInt(searchText)) });
        else
          this.setState({ listUnfinishedFood: listUnfinishedFood.filter(item => item.food.name.search(searchText) > -1) });
      })
      .catch(error => this.setState({ listUnfinishedFood: [] }));
  }

  render() {
    const { listUnfinishedFood, search } = this.state;
    const { container, wrapHeader, inputSearch, headerTable, headerWrapTrangThai, headerWrapTen, headerWrapSoLuong, headerWrapBan,
      headerWrapThoiGian, txtHeader, textItem,
      wrapItem, btnCheck, imageStyle, txtTen, txtSoLuong, txtBan, txtThoiGian
    } = styles;
    return (
      <View style={container}>
        <View style={wrapHeader}>
          <TextInput
            style={inputSearch}
            placeholder="Tìm kiếm bàn hoặc tên món"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => {
              this.setState({ search: text });
              if (text == '')
                this.onReloadData();
              else
                this.onSearch(text);
            }}
          />
        </View>

        <View style={{ margin: 10, paddingVertical: 10, backgroundColor: 'white', elevation: 3, borderRadius: 5 }}>
          <View style={headerTable}>
            <View style={headerWrapTrangThai}>
              <TouchableOpacity
                onPress={() => { }}>
                <Text style={txtHeader}></Text>
              </TouchableOpacity>
            </View>
            <View style={headerWrapTen}>
              <TouchableOpacity
                onPress={() => { }}>
                <Text style={txtHeader}>Tên món</Text>
              </TouchableOpacity>
            </View>
            <View style={headerWrapSoLuong}>
              <TouchableOpacity
                onPress={() => { }}>
                <Text style={txtHeader}>SL</Text>
              </TouchableOpacity>
            </View>
            <View style={headerWrapBan}>
              <TouchableOpacity
                onPress={() => { }}>
                <Text style={txtHeader}>Bàn</Text>
              </TouchableOpacity>
            </View>
            <View style={headerWrapThoiGian}>
              <TouchableOpacity
                onPress={() => { }}>
                <Text style={txtHeader}>Thời gian</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={listUnfinishedFood.sort((a, b) => a.billDetail.time - b.billDetail.time)}
            renderItem={({ item }) =>
              <View style={wrapItem}>
                <TouchableOpacity style={btnCheck}
                  onPress={() => this.onFinishedFood(item)}
                >
                  <Image source={checkInactiveIcon} style={imageStyle}
                  ></Image>
                </TouchableOpacity>
                <View style={txtTen}>
                  <Text style={textItem}>{item.food.name}</Text>
                </View>
                <View style={txtSoLuong}>
                  <Text style={textItem}>{item.billDetail.quantity}</Text>
                </View>
                <View style={txtBan}>
                  <Text style={textItem}>{item.billDetail.idTable}</Text>
                </View>
                <View style={txtThoiGian}>
                  <Text style={textItem}>{getFormattedTime(item.billDetail.time)}</Text>
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
  // ---> Header <---
  wrapHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10
  },
  inputSearch: {
    height: height / 20,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
  },
  // ---> Table Header <---
  headerTable: {
    flexDirection: 'row',
    margin: 10,
  },
  headerWrapTrangThai: { flex: 1, justifyContent: 'center' },
  headerWrapTen: { flex: 4, justifyContent: 'center' },
  headerWrapSoLuong: { flex: 1, justifyContent: 'center' },
  headerWrapBan: { flex: 1, justifyContent: 'center' },
  headerWrapThoiGian: { flex: 2, justifyContent: 'center' },
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
  txtSoLuong: { flex: 1 },
  txtBan: { flex: 1 },
  txtThoiGian: { flex: 2 },
  txtItem: {
    color: 'black',
    flexWrap: 'wrap',
    fontSize: 14
  },
});
