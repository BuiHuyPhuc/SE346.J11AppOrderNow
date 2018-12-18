import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, FlatList
} from 'react-native';

import SourceImage from './../../../Api/SourceImage';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

export default class FlatListCategoryFood extends Component {
	render() {
		const { listCategoryFood, onNavigationFood } = this.props;
		const { wrapItemCategory, wrapText, txtNameCategory } = styles;
		return(
			<FlatList
	          data={listCategoryFood}
	          numColumns={2}
	          renderItem={({item}) =>
	            <View style={wrapItemCategory}>
	              <TouchableOpacity
	                style={{ width: imgMonNuong.imgWidth }}
	                onPress={() => onNavigationFood(item.id)}
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
		);
	}
}

const styles = StyleSheet.create({
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
