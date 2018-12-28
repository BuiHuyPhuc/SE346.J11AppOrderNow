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
		const { wrapItem, imageStyle, textName } = styles;
		return (
			<FlatList
				data={listCategoryFood}
				numColumns={2}
				renderItem={({ item }) =>
					<View style={wrapItem}>
						<TouchableOpacity
							onPress={() => onNavigationFood(item)}
						>
							<Image
								style={imageStyle}
								source={item.image == '' ? { uri: linkImageDefault } : { uri: item.image }}
							/>
							<Text style={textName}>{item.name}</Text>
						</TouchableOpacity>
					</View>

				}
				keyExtractor={item => item.id.toString()}
			/>
		);
	}
}

const styles = StyleSheet.create({
	wrapItem: {
		margin: 10,
		borderRadius: 5,
		backgroundColor: 'white',
		elevation: 3
	},

	imageStyle: {
		width: (width - 40) / 2,
		height: ((width - 40) / 2)*0.75,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	textName: {
		color: 'black',
		alignSelf: 'center',
		marginVertical: 15,
		fontWeight:'bold'
	}
});
