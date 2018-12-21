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
    .then(() => alert(`${item.food.name} đã hoàn thành`))
    .catch(error => alert('Món ăn bị lỗi'));
  }

  onSearch(searchText) {
    filterUnfinishedFood()
    .then(listUnfinishedFood => {
      if(!isNaN(parseInt(searchText)))
        this.setState({ listUnfinishedFood: listUnfinishedFood.filter(item => item.billDetail.idTable === parseInt(searchText)) });
      else
        this.setState({ listUnfinishedFood: listUnfinishedFood.filter(item => item.food.name.search(searchText) > -1) });
    })
    .catch(error => this.setState({ listUnfinishedFood: [] }));
  }

  render() {
    const { listUnfinishedFood, search } = this.state;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            headerTable, headerWrapTen, headerWrapSoLuong, headerWrapBan, headerWrapThoiGian, txtHeader, 
            wrapItem, btnCheck, txtTen,txtSoLuong, txtBan, txtThoiGian
          } = styles;
    return (
      <View style={container}>
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Tìm kiếm bàn hoặc tên món ..."
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => {
              this.setState({ search: text });
              if(text == '')
                this.onReloadData();
              else
                this.onSearch(text);
            }}
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

        <FlatList
          data={listUnfinishedFood.sort((a, b) => a.billDetail.time - b.billDetail.time)}
          renderItem={({item}) =>
            <View style={wrapItem}>
              <TouchableOpacity
                style={btnCheck}
                onPress={() => this.onFinishedFood(item)}
              >
                <Image source={checkInactiveIcon}></Image>
              </TouchableOpacity>
              <View style={txtTen}>
                <Text>{item.food.name}</Text>
              </View>
              <View style={txtSoLuong}>
                <Text>{item.billDetail.quantity}</Text>
              </View>
              <View style={txtBan}>
                <Text>{item.billDetail.idTable}</Text>
              </View>       
              <View style={txtThoiGian}>
                <Text>{getFormattedTime(item.billDetail.time)}</Text>
              </View>
            </View>
          }
          keyExtractor={item => item.billDetail.id.toString()}
        />

      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if(isMouted)
        this.onReloadData();           
    });
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
  headerTable: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 10
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
    paddingHorizontal: 5,
    marginTop: 5,
    alignItems: 'center' 
  },
  btnCheck: { flex: 2, alignItems: 'center' },
  txtTen: { flex: 7, marginHorizontal: 5 },
  txtSoLuong: { flex: 6, alignItems: 'center' },
  txtBan: { flex: 3, alignItems: 'center' },
  txtThoiGian: { flex: 6, alignItems: 'center' }
});
