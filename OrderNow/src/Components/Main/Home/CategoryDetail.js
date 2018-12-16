import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,Alert, FlatList, Image, Dimensions, TextInput
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { filterFoodByCategoryFoodId, insertNewBill, queryAllBill,
  insertNewBillDetail, queryAllBillDetail, tableStatus, deleteAllBillAndBillDetail } from './../../../Database/All_Schemas';

import { connect } from 'react-redux';

import HeaderBack from './../HeaderBack';
import ComboboxTable from './ComboboxTable';
import SourceImage from './../../../Api/SourceImage';
import getFormattedMoney from './../../../Api/FormattedMoney';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window")

class CategoryDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listFood: [],
      search: ''
    };
    this.onReloadData();
    realm.addListener('change', () => {
      this.onReloadData();
    })
  }

  onReloadData() {
    filterFoodByCategoryFoodId(this.props.navigation.state.params.categoryFoodId)
    .then(list => {
      this.setState({ listFood: [] });
      list.map(e => {
        this.setState({ listFood: this.state.listFood.concat({ food: e, quantity: 1 }) })
      })
    })
    .catch(error => this.setState({ listFood: [] }));
  }

  //////////////////// Tăng - giảm số lượng món cần gọi ////////////////////
  onIncrease(itemId) {
    const newListFood = this.state.listFood.map(e => {
      if(e.food.id !== itemId)
        return e;
      return { food: e.food, quantity: e.quantity + 1 };
    })
    this.setState({ listFood: newListFood });
  }

  onDecrease(itemId) {
    const newListFood = this.state.listFood.map(e => {
      if(e.food.id !== itemId)
        return e;
      return { food: e.food, quantity: e.quantity <= 1 ? 1 : e.quantity - 1 };
    })
    this.setState({ listFood: newListFood  });
  }
  //////////////////// Tăng - giảm số lượng món cần gọi ////////////////////

  //Tạo hóa đơn mới khi bàn trống gọi món
  onCreateNewBill(item) {
    insertNewBill({
      id: Math.floor(Date.now() / 1000)
    })
    .then(newBill => {
      insertNewBillDetail({
        id: Math.floor(Date.now() / 1000),
        quantity: item.quantity,
        status: false,
        time: new Date(),
        idEmployee: this.props.employee.id,
        idTable: this.props.table,
        idFood: item.food.id,
        idBill: newBill.id
      })
      .then(newBillDetail => alert(`Thêm ${item.food.name} số lượng ${item.quantity} thành công`))
      .catch(error => alert('ONCREATEBILLDETAIL - Thêm thất bại'));
    })
    .catch(error => alert('ONCREATEBILL - Thêm thất bại'));
  }

  //Thêm món vào hóa đơn khi bàn đang sử dụng gọi thêm món
  onAddBillOld(item, idBill) {
    insertNewBillDetail({
      id: Math.floor(Date.now() / 1000),
      quantity: item.quantity,
      status: false,
      time: new Date(),
      idEmployee: this.props.employee.id,
      idTable: this.props.table,
      idFood: item.food.id,
      idBill: idBill
    })
    .then(newBillDetail => alert(`Thêm ${item.food.name} số lượng ${item.quantity} thành công`))
    .catch(error => alert('ONCREATEBILLDETAIL - Thêm thất bại'));
  }

  onShowBill() {
    queryAllBill()
    .then(listBill => console.log("listBill", listBill))
    .catch(error => alert('Xem listBill thất bại'));
  }

  onShowBillDetail() {
    queryAllBillDetail()
    .then(listBillDetal => console.log("listBillDetal", listBillDetal))
    .catch(error => alert('Xem listBillDetal thất bại'));
  }

  //Xử lý của button Thêm món
  onInsertOrder(item) {
    tableStatus(this.props.table)
    .then(idBill => idBill === null ? this.onCreateNewBill(item) : this.onAddBillOld(item, idBill))
    .catch(error => alert('onInsertOrder thất bại'));
  }

  render() {
    const { listFood, search, quantity } = this.state;
    const { navigation, table, employee } = this.props;
    const { container, wrapHeader, inputSearch, wrapAllFeature, wrapFeature, btnFeature,
            wrapListFood, wrapItemFood, wrapInfoFood, txtFood, wrapSoLuongFood, btnFood 
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Category Detail"
        />


        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => {
              this.setState({ search: text });
              if(text == '')
                this.onReloadData();
              else
                this.setState({ listFood: [] });
            }}
          />

          <View style={wrapAllFeature}>
            <Text style={{ fontSize: 24 }}>Bàn số {table}</Text>

            <View style={wrapFeature}>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => this.onShowBill()}
              >
                <Text>a</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => this.onShowBillDetail()}
              >
                <Text>a</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <FlatList
          style={wrapListFood}
          data={listFood}
          renderItem={({item}) =>
            <View style={wrapItemFood}>
              <Image
                style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }} 
                source={monnuongIcon}
              />
              
              <View style={wrapInfoFood}>
                <Text style={txtFood}>{item.food.name}</Text>
                <Text style={txtFood}>Đơn giá: {item.food.price.getFormattedMoney(0)} VNĐ</Text>
                <View style={wrapSoLuongFood}>
                  <Text style={txtFood}>Số lượng: </Text>
                  <TouchableOpacity
                    style={[btnFood, { width: 30 }]}
                    onPress={() => this.onDecrease(item.food.id)}
                  >
                    <Text style={txtFood}>-</Text>
                  </TouchableOpacity>
                  <Text style={txtFood}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={[btnFood, { width: 30 }]}
                    onPress={() => this.onIncrease(item.food.id)}
                  >
                    <Text style={txtFood}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[btnFood, { width: imgMonNuong.imgWidth, backgroundColor: '#B0B0B0' }]}
                  onPress={() => this.onInsertOrder(item)}
                >
                  <Text style={txtFood}>Thêm món</Text>
                </TouchableOpacity>
              </View>
            </View> 
          }
          keyExtractor={item => item.food.id.toString()}
        />        
        
      </View>
    );
  }
}

function mapStatetoProps(state) {
  return {
    employee: state.employeeSignedIn,
    table: state.chooseTable
  };
}

export default connect(mapStatetoProps)(CategoryDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // ---> Header <---
  wrapHeader: {
    paddingHorizontal: 10,
    marginBottom: 5
  },
  inputSearch: {
    width: width - 20,
    height: height / 16,
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginVertical: 5
  },
  wrapAllFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapFeature: {
    flexDirection: 'row',
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
  // ---> List Food <---
  wrapListFood: {
    paddingHorizontal: 5
  },
  wrapItemFood: {    
    flexDirection: 'row',
    marginTop: 5
  },
  wrapInfoFood: {
    marginLeft: 10,
    marginTop: -5,
    justifyContent: 'space-around'
  },
  txtFood: {
    fontSize: 18
  },
  wrapSoLuongFood: {
    flexDirection: 'row'
  },
  btnFood: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
