import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions, BackHandler
} from 'react-native';

import linkImageDefault from './../../../Api/LinkImageDefault';
import HeaderBack from './../HeaderBack';
//import SourceImage from './../../../Api/SourceImage';
import getFormattedMoney from './../../../Api/FormattedMoney';

//let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
//const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window");

export default class FlatListFood extends Component {
	render() {
		const { listFood, onIncrease, onDecrease, onInsertOrder } = this.props;
		const { wrapItem, imageStyle, wrapInfo, wrapAction, textName, textPrice, textQuantity, textBtnThem, wrapSoLuongFood, btnTang_Giam, btnThem } = styles;

		if (listFood == null)
			return (<View />)

		return (
			<View>
				<FlatList
					data={listFood}
					renderItem={({ item }) =>
						<View style={wrapItem}>
							<Image
								style={imageStyle}
								source={item.food.image == '' ? { uri: linkImageDefault } : { uri: item.food.image }}
							/>
							<View style={wrapInfo}>
								<Text style={textName}>{item.food.name}</Text>
								<Text style={textPrice}>{item.food.price.getFormattedMoney(0)} VNĐ</Text>
							</View>
							<View style={wrapAction}>
								<View style={wrapSoLuongFood}>
									<Text style={textPrice}></Text>
									<TouchableOpacity
										style={btnTang_Giam}
										onPress={() => onDecrease(item.food.id)}
									>
										<Text style={textQuantity}>-</Text>
									</TouchableOpacity>
									<Text style={textQuantity}>{item.quantity}</Text>
									<TouchableOpacity
										style={btnTang_Giam}
										onPress={() => onIncrease(item.food.id)}
									>
										<Text style={textQuantity}>+</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={btnThem}
									onPress={() => onInsertOrder(item)}
								>
									<Text style={textBtnThem}>Thêm</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
					keyExtractor={item => item.food.id.toString()}
				/>
			</View>

		);
	}

	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			this.props.onBackCategoryFood(); // works best when the goBack is async
			return true;
		});
	}

	componentWillUnmount() {
		this.backHandler.remove();
	}
}


const styles = StyleSheet.create({	
	wrapItem: {
		flexDirection: 'row',
		margin: 10,
		borderRadius: 5,
		backgroundColor: 'white',
		elevation: 3
	},
	imageStyle: {
		width: (width - 20) / 3,
		height: ((width - 20) / 3) * 0.75,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	wrapInfo: {
		width: (width - 20) / 3,
		padding: 10,
		justifyContent: 'center',
	},
	wrapAction: {
		width: (width - 20) / 3,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textName: {
		color: 'black',
		flexWrap: 'wrap',
		fontWeight: 'bold'
	},
	textPrice: {
		color: 'black',
		flexWrap: 'wrap',
	},
	textQuantity: {
		color: 'black',
		fontSize: 24,
		marginHorizontal: 5
	},
	textBtnThem: {
		color: 'white',		
		fontWeight:'bold'
	},
	wrapSoLuongFood: {
		flexDirection: 'row',
	},
	btnTang_Giam: {
		width: width / 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnThem: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fe5644',
		width: width / 4,
		height: height / 24,
		borderRadius: 5,
	}
});

//[btnFood, { width: imgWidth, backgroundColor: '#B0B0B0' }]
