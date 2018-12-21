import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, FlatList
} from 'react-native';

import realm from './../../../../Database/All_Schemas';
import { queryAllFood } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
         onPopupAddFood, onPopupUpdateDeleteFood } from './../../../../Redux/ActionCreators';

import HeaderBack from './../../HeaderBack';
import PopUpFood from './PopUpFood';
import getFormattedMoney from './../../../../Api/FormattedMoney';

const { width, height } = Dimensions.get("window");
var isMouted = false;

class MngFood extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listFood: [],
      search: ''
    };  
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onReloadData() {
    queryAllFood()
    .then(listFood => this.setState({ listFood }))
    .catch(error => this.setState({ listFood: [] }));
  }

  onSearch(searchText) {
    queryAllFood()
    .then(listFood => {
      if(!isNaN(parseInt(searchText)))
        this.setState({ listFood: listFood.filter(item => item.food.price === parseInt(searchText)) });
      else
        this.setState({ listFood: listFood.filter(item => (item.food.name.search(searchText) > -1) || (item.categoryFoodName.search(searchText) > -1)) });
    })
    .catch(error => this.setState({ listFood: [] }));
  }

  render() {
    const { listFood, search } = this.state;
    const { navigation, onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
            onPopupAddFood, onPopupUpdateDeleteFood } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            headerTable, headerWrapTen, headerWrapDonGia, headerWrapLoai, txtHeader,
            wrapItem, txtTen, txtDonGia, txtLoai
          } = styles;
    return (
      <View style={ container }>
        <HeaderBack 
          navigation={navigation}
          name="Management Food"
        />

        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Tìm kiếm loại món ăn, tên món hoặc giá ..."
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
              onPress={() => {                
                onShowPopupAdd();
                onPopupAddFood();
              }}
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
          <View style={headerWrapDonGia}>
            <TouchableOpacity 
              onPress={() => {}}>
              <Text style={txtHeader}>Đơn giá</Text>
            </TouchableOpacity>              
          </View>
          <View style={headerWrapLoai}>
            <TouchableOpacity 
              onPress={() => {}}>                
              <Text style={txtHeader}>Loại món</Text>
            </TouchableOpacity>              
          </View>                       
        </View>

        <FlatList
          data={listFood}
          renderItem={({item}) =>
            <TouchableOpacity
              style={wrapItem}
              onPress={() => {
                onShowPopupUpdateDelete();
                onPopupUpdateDeleteFood(item.food);
              }}
            >
              <View style={txtTen}>
                <Text>{item.food.name}</Text>
              </View>                           
              <View style={txtDonGia}>
                <Text>{item.food.price.getFormattedMoney(0)}</Text>
              </View>
              <View style={txtLoai}>
                <Text>{item.categoryFoodName}</Text>
              </View>
            </TouchableOpacity> 
          }
          keyExtractor={item => item.food.id.toString()}
        />  

        <PopUpFood />
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

export default connect(null, { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
  onPopupAddFood, onPopupUpdateDeleteFood })(MngFood);

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
  headerWrapTen: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapDonGia: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapLoai: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold'
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtTen: { flex: 2, alignItems: 'center' },
  txtDonGia: { flex: 1, alignItems: 'center' },
  txtLoai: { flex: 1, alignItems: 'center' }
});
