import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,Alert, FlatList, Image, Dimensions, TextInput
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { queryAllCategoryFood, filterFoodByCategoryFoodId, insertNewBill, insertNewBillDetail,
 tableStatus, filterCategoryFoodOrFood, deleteAllBillAndBillDetail, queryAllBill, queryAllBillDetail } from './../../../Database/All_Schemas';

import { connect } from 'react-redux';

import HeaderHome from './HeaderHome';
import FlatListCategoryFood from './FlatListCategoryFood';
import FlatListFood from './FlatListFood';

const { width, height } = Dimensions.get("window");
var isMouted = false;

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listData: [],
      nameList: 'categoryFood',
      categoryFoodId: null,
      isFilter: false,
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onBackCategoryFood() {
    queryAllCategoryFood()
    .then(listData => this.setState({ listData, nameList: 'categoryFood', categoryFoodId: null, search: '', isFilter: false }))
    .catch(error => this.setState({ listData: [] }));
  }

  onNavigationFood(categoryFoodId) {
    filterFoodByCategoryFoodId(categoryFoodId)
    .then(listData => this.setState({ listData, nameList: 'food', categoryFoodId, isFilter: false }))
    .catch(error => this.setState({ listData: [] }));
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  onReloadData() {
    const { listData, nameList, categoryFoodId } = this.state;
    if(nameList === 'categoryFood') {
      queryAllCategoryFood()
      .then(listData => this.setState({ listData }))
      .catch(error => this.setState({ listData: [] }));
    } else {
      filterFoodByCategoryFoodId(categoryFoodId)
      .then(listData => this.setState({ listData }))
      .catch(error => this.setState({ listData: [] }));
    }
  }

  onFilterData(searchText) {
    filterCategoryFoodOrFood(searchText)
    .then(listFilter => {
      console.log("listFilter", listFilter);
      this.setState({ listData: listFilter.listData, nameList: listFilter.nameList, isFilter: true });
    })
    .catch(error => this.setState({ listData: [] }));
  }

  //////////////////// Show bill - billDetail ////////////////////
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
  //////////////////// Show bill - billDetail ////////////////////


  //////////////////// Tăng - giảm số lượng món cần gọi ////////////////////
  onIncrease(itemId) {
    const newListFood = this.state.listData.map(e => {
      if(e.food.id !== itemId)
        return e;
      return { food: e.food, quantity: e.quantity + 1 };
    })
    this.setState({ listData: newListFood });
  }

  onDecrease(itemId) {
    const newListFood = this.state.listData.map(e => {
      if(e.food.id !== itemId)
        return e;
      return { food: e.food, quantity: e.quantity <= 1 ? 1 : e.quantity - 1 };
    })
    this.setState({ listData: newListFood  });
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

  //Xử lý của button Thêm món
  onInsertOrder(item) {
    tableStatus(this.props.table)
    .then(idBill => idBill === null ? this.onCreateNewBill(item) : this.onAddBillOld(item, idBill))
    .catch(error => alert('onInsertOrder thất bại'));
  }

  render() {
    const { listData, nameList } = this.state;
    const { container, wrapListData, headerBack, btnBack, txtBack } = styles;

    console.log("nameList", nameList);
    const MainView = nameList == 'categoryFood' ?
    <FlatListCategoryFood 
      listCategoryFood={listData}
      onNavigationFood={categoryFoodId => this.onNavigationFood(categoryFoodId)}
    /> 
    : 
    <FlatListFood
      listFood={listData}
      onIncrease={foodId => this.onIncrease(foodId)}
      onDecrease={foodId => this.onDecrease(foodId)}
      onInsertOrder={food => this.onInsertOrder(food)}
    />

    return (
      <View style={container}>
        <HeaderHome 
          onBackCategoryFood={() => this.onBackCategoryFood()}
          onFilterData={searchText => this.onFilterData(searchText)}
          onShowBill={() => this.onShowBill()}
          onShowBillDetail={() => this.onShowBillDetail()}
        />

        {nameList === 'categoryFood' ? null : (
          <View style={headerBack}>
            <TouchableOpacity
                style={btnBack}
                onPress={() => this.onBackCategoryFood()}
            >
              <Image source={require('./../../../Media/Icon/left.png')} />
            </TouchableOpacity>
          </View>
        )}

        {MainView}        
        
      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if(isMouted)
        this.state.isFilter ? this.onFilterData(this.props.search) : this.onReloadData();          
    });
  }
}

function mapStatetoProps(state) {
  return {
    employee: state.employeeSignedIn,
    table: state.chooseTable.table,
    search: state.chooseTable.search
  };
}

export default connect(mapStatetoProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // ---> Header Back <---
  headerBack: {
    height: height / 12,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  txtBack: {
    fontSize: 20
  },
});
