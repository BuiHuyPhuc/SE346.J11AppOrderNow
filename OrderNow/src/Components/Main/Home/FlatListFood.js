import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, FlatList
} from 'react-native';

import SourceImage from './../../../Api/SourceImage';
import getFormattedMoney from './../../../Api/FormattedMoney';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

export default class FlatListFood extends Component {
	render() {
		const { listFood, onIncrease, onDecrease, onInsertOrder } = this.props;
		const { wrapListFood, wrapItemFood, wrapInfoFood, txtFood, wrapSoLuongFood, btnFood } = styles;
		
		if(listFood == null)
			return (<View />)

		return(
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
		                  onPress={() => onDecrease(item.food.id)}
		                >
		                  <Text style={txtFood}>-</Text>
		                </TouchableOpacity>
		                <Text style={txtFood}>{item.quantity}</Text>
		                <TouchableOpacity
		                  style={[btnFood, { width: 30 }]}
		                  onPress={() => onIncrease(item.food.id)}
		                >
		                  <Text style={txtFood}>+</Text>
		                </TouchableOpacity>
		              </View>
		              <TouchableOpacity
		                style={[btnFood, { width: imgMonNuong.imgWidth, backgroundColor: '#B0B0B0' }]}
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

const styles = StyleSheet.create({
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
