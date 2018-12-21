import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions
} from 'react-native';

import linkImageDefault from './../../../Api/LinkImageDefault';
//import SourceImage from './../../../Api/SourceImage';
import getFormattedMoney from './../../../Api/FormattedMoney';

//let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
//const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window");

export default class FlatListFood extends Component {
	render() {
		const { listFood, onIncrease, onDecrease, onInsertOrder } = this.props;
		const { wrapListFood, wrapItemFood, imgStyle, 
				wrapInfoFood, txtFood, wrapSoLuongFood, btnTang_Giam, btnThem } = styles;
		
		if(listFood == null)
			return (<View />)

		return(
			<FlatList
		        style={wrapListFood}
		        data={listFood}
		        renderItem={({item}) =>
		          <View style={wrapItemFood}>
		            <Image
		              style={imgStyle} 
		              source={item.food.image == '' ? {uri: linkImageDefault} : {uri: item.food.image}}
		            />
		            
		            <View style={wrapInfoFood}>
		              <Text style={txtFood}>{item.food.name}</Text>
		              <Text style={txtFood}>Đơn giá: {item.food.price.getFormattedMoney(0)} VNĐ</Text>
		              <View style={wrapSoLuongFood}>
		                <Text style={txtFood}>Số lượng: </Text>
		                <TouchableOpacity
		                  style={btnTang_Giam}
		                  onPress={() => onDecrease(item.food.id)}
		                >
		                  <Text style={txtFood}>-</Text>
		                </TouchableOpacity>
		                <Text style={txtFood}>{item.quantity}</Text>
		                <TouchableOpacity
		                  style={btnTang_Giam}
		                  onPress={() => onIncrease(item.food.id)}
		                >
		                  <Text style={txtFood}>+</Text>
		                </TouchableOpacity>
		              </View>
		              <TouchableOpacity
		                style={btnThem}
		                onPress={() => onInsertOrder(item)}
		              >
		                <Text style={txtFood}>Thêm món</Text>
		              </TouchableOpacity>
		            </View>
		          </View> 
		        }
		        keyExtractor={item => item.food.id.toString()}
		    />
		    //<View />
		);
	}
}

const imgWidth = (width - 20) / 2;

const styles = StyleSheet.create({
  wrapListFood: {
    paddingHorizontal: 5
  },
  wrapItemFood: {    
    flexDirection: 'row',
    marginTop: 5
  },
  imgStyle: {
  	width: imgWidth,
  	height: height / 5
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
  btnTang_Giam: {
  	width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnThem: {
  	width: imgWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0B0B0'
  }
});

//[btnFood, { width: imgWidth, backgroundColor: '#B0B0B0' }]
