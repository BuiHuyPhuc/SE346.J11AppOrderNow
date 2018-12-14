import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, Image, Dimensions, TextInput, Picker
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { queryAllCategoryFood } from './../../../Database/All_Schemas';

import ComboboxTable from './ComboboxTable';
import SourceImage from './../../../Api/SourceImage';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listCategoryFood: [],
      search: '',
    };
    this.onReloadData();
    realm.addListener('change', () => {
      this.onReloadData();           
    });
  }

  onReloadData() {
    queryAllCategoryFood()
    .then(listCategoryFood => this.setState({ listCategoryFood }))
    .catch(error => this.setState({ listCategoryFood: [] }));
  }

  render() {
    const { search, listTable, listCategoryFood } = this.state;
    const { navigate } = this.props.navigation;
    const { container, wrapHeader, inputSearch, wrapAllFeature, wrapFeature, btnFeature,
            wrapItemCategory, wrapText, txtNameCategory 
          } = styles;
    return (
      <View style={container}>
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search CategoryFood and Food"
            underlineColorAndroid='transparent'
            onChangeText={text => {
              this.setState({ search: text });
              if(text == '')
                this.onReloadData();
              else
                this.setState({ listCategoryFood: [] }); 
            }}
            value={search}
          />
          
          <View style={wrapAllFeature}>
            <ComboboxTable />

            <View style={wrapFeature}>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => {}}
              >
                <Text>a</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => {}}
              >
                <Text>a</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <FlatList
          data={listCategoryFood}
          numColumns={2}
          renderItem={({item}) =>
            <View style={wrapItemCategory}>
              <TouchableOpacity
                style={{ width: imgMonNuong.imgWidth }}
                onPress={() => navigate('Screen_CategoryDetail', { categoryFoodId: item.id })}
              >
                <Image
                  style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }}
                  source={monnuongIcon}
                />                            
              </TouchableOpacity>
              <View style={wrapText}>
                <Text style={txtNameCategory}>{item.name}</Text>
              </View>
            </View> 
          }
          keyExtractor={item => item.id.toString()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // ---> Header <---
  wrapHeader: {
    paddingHorizontal: 10,
    marginBottom: 5,
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
  // ---> List Category <---
  wrapItemCategory: {
    paddingHorizontal: 5
  },
  wrapText: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  txtNameCategory: {
    fontSize: 24
  }
});
