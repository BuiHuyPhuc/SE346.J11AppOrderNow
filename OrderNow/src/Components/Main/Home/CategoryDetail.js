import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,Alert, FlatList, Image, Dimensions, TextInput
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { queryAllFoodByCategoryFoodId } from './../../../Database/All_Schemas';

import { connect } from 'react-redux';

import HeaderBack from './../HeaderBack';
import ComboboxTable from './ComboboxTable';
import SourceImage from './../../../Api/SourceImage';

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
    queryAllFoodByCategoryFoodId(this.props.navigation.state.params.categoryFoodId)
    .then(listFood => this.setState({ listFood }))
    .catch(error => this.setState({ listFood: [] }));
  }

  render() {
    const { search, listFood } = this.state;
    const { navigation, table } = this.props;
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
          style={wrapListFood}
          data={listFood}
          renderItem={({item}) =>
            <View style={wrapItemFood}>
              <Image
                style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }} 
                source={monnuongIcon}
              />
              
              <View style={wrapInfoFood}>
                <Text style={txtFood}>{item.name}</Text>
                <Text style={txtFood}>{item.price}</Text>
                <View style={wrapSoLuongFood}>
                  <TouchableOpacity
                    style={[btnFood, { width: 30 }]}
                    onPress={() => {}}
                  >
                    <Text style={txtFood}>-</Text>
                  </TouchableOpacity>
                  <Text style={txtFood}>SL</Text>
                  <TouchableOpacity
                    style={[btnFood, { width: 30 }]}
                    onPress={() => {}}
                  >
                    <Text style={txtFood}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[btnFood, { width: imgMonNuong.imgWidth, backgroundColor: '#B0B0B0' }]}
                  onPress={() => console.log("table", table)}
                >
                  <Text style={txtFood}>Thêm món</Text>
                </TouchableOpacity>
              </View>
            </View> 
          }
          keyExtractor={item => item.id.toString()}
        />        
        
      </View>
    );
  }
}

function mapStatetoProps(state) {
  return {
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
