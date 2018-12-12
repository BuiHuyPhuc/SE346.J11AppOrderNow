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

const { width, height } = Dimensions.get("window");

class MgnFood extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listFood: [],
      search: ''
    };    
    this.onReloadData();
    realm.addListener('change', () => {
      this.onReloadData();
    });
  }

  onReloadData() {
    queryAllFood()
    .then(listFood => this.setState({ listFood }))
    .catch(error => this.setState({ listFood: [] }));
  }

  render() {
    const { search, listFood } = this.state;
    const { navigation, onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
            onPopupAddFood, onPopupUpdateDeleteFood } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            wrapTable, headerTable, headerWrapTen, headerWrapDonGia, headerWrapLoai, txtHeader,
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
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => this.setState({ search: text })}
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

        <View style={wrapTable}>
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
                  onPopupUpdateDeleteFood(item);
                }}
              >
                <View style={txtTen}>
                  <Text>{item.name}</Text>
                </View>                           
                <View style={txtDonGia}>
                  <Text>{item.price}</Text>
                </View>
                <View style={txtLoai}>
                  <Text>Món nướng</Text>
                </View>
              </TouchableOpacity> 
            }
            keyExtractor={item => item.id.toString()}
          /> 
        </View>  

        <PopUpFood />
      </View>
    );
  }
}

export default connect(null, { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
  onPopupAddFood, onPopupUpdateDeleteFood })(MgnFood);

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
  wrapTable: {
    paddingHorizontal: 5,
    marginTop: 10 
  },
  headerTable: {
    flexDirection: 'row'
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
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtTen: { flex: 2, alignItems: 'center' },
  txtDonGia: { flex: 1, alignItems: 'center' },
  txtLoai: { flex: 1, alignItems: 'center' }
});
