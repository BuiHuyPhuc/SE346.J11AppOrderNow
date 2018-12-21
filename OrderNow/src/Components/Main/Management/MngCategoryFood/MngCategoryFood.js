import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput
} from 'react-native';

import realm from './../../../../Database/All_Schemas';
import { queryAllCategoryFoodAndFoods } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete, onLoadListCategoryFood,
         onPopupAddCategoryFood, onPopupUpdateDeleteCategoryFood } from './../../../../Redux/ActionCreators';

import HeaderBack from './../../HeaderBack';
import PopUpCategoryFood from './PopUpCategoryFood';

const { width, height } = Dimensions.get("window");
var isMouted = false;

class MngCategoryFood extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listCategoryFood_Foods: [],
      search: ''
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onReloadData() {
    queryAllCategoryFoodAndFoods()
    .then(listCategoryFood_Foods => this.setState({ listCategoryFood_Foods }))
    .catch(error => this.setState({ listCategoryFood_Foods: [] }));
  }

  onSearch(searchText) {
    queryAllCategoryFoodAndFoods()
    .then(listCategoryFood_Foods => this.setState({ listCategoryFood_Foods: listCategoryFood_Foods.filter(item => item.categoryFood.name.search(searchText) > -1) }))
    .catch(error => this.setState({ listCategoryFood_Foods: [] }));
  }
  
  render() {
    const { listCategoryFood_Foods, search } = this.state;
    const { navigation, onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
            onPopupAddCategoryFood, onPopupUpdateDeleteCategoryFood } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature, 
            headerTable, headerWrapLoai, headerWrapSoLuong, txtHeader,
            wrapItem, txtLoai, txtSoLuong 
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Management CategoryFood"
        />        
        
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Tìm kiếm loại món ăn ..."
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
                onPopupAddCategoryFood();
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={headerTable}>
          <View style={headerWrapLoai}>
            <TouchableOpacity 
              onPress={() => {}}>                
              <Text style={txtHeader}>Loại món</Text>
            </TouchableOpacity>              
          </View>
          <View style={headerWrapSoLuong}>
            <TouchableOpacity 
              onPress={() => {}}>
              <Text style={txtHeader}>Số lượng món</Text>
            </TouchableOpacity>              
          </View>           
        </View>

      
        <FlatList
          data={listCategoryFood_Foods}
          renderItem={({item}) =>
            <TouchableOpacity 
              style={wrapItem}
              onPress={() => {
                onShowPopupUpdateDelete();
                onPopupUpdateDeleteCategoryFood(item.categoryFood);
              }}
            >
              <View style={txtLoai}>
                <Text>{item.categoryFood.name}</Text>
              </View>
              <View style={txtSoLuong}>
                <Text>{item.foods.length}</Text>
              </View>       
            </TouchableOpacity> 
          }
          keyExtractor={item => item.categoryFood.id.toString()}
        />   
        
        <PopUpCategoryFood />
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
  onPopupAddCategoryFood, onPopupUpdateDeleteCategoryFood })(MngCategoryFood);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
  // ---> Table Header <---
  wrapTable: {

  },
  headerTable: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 10
  },
  headerWrapLoai: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapSoLuong: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  txtLoai: { flex: 2, alignItems: 'center' },
  txtSoLuong: { flex: 1, alignItems: 'center' },
});
