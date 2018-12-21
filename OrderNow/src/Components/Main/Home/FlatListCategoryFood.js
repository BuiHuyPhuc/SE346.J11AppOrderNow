import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions
} from 'react-native';

//let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
//const imgMonNuong = SourceImage(monnuongIcon);

import linkImageDefault from './../../../Api/LinkImageDefault';

const { width, height } = Dimensions.get("window");

export default class FlatListCategoryFood extends Component {
	render() {
		const { listCategoryFood, onNavigationFood } = this.props;
		const { wrapItemCategory, wrapButton, imgStyle, wrapText, txtNameCategory } = styles;
		return(
			<FlatList
	          data={listCategoryFood}
	          numColumns={2}
	          renderItem={({item}) =>
	            <View style={wrapItemCategory}>
	              <TouchableOpacity
	                style={wrapButton}
	                onPress={() => onNavigationFood(item.id)}
	              >
	                <Image
	                  style={imgStyle}
	                  source={item.image == '' ? {uri: linkImageDefault} : {uri: item.image}}
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

const imgWidth = (width - 20) / 2;

const styles = StyleSheet.create({
  wrapItemCategory: {
    paddingHorizontal: 5
  },
  wrapButton: {
  	width: imgWidth,
  },
  imgStyle: {
  	width: imgWidth,
  	height: height / 5
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
