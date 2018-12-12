import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Image,
} from 'react-native';

import menuIcon from './../../Media/Icon/menu.png';
import logoIcon from './../../Media/Icon/logo.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {
	render() {
		const { onOpen } = this.props;
		const { wrapper, row, titleStyle } = styles;
		return (
			<View style={wrapper}>
				<View style={row}>
					<TouchableOpacity onPress={onOpen}>
						<Image source={menuIcon} />
					</TouchableOpacity>
					<Text style={titleStyle}>Order Now</Text>
					<Image source={logoIcon} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: { 
		height: height / 12, 
		backgroundColor: '#2ABB9C', 
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	row: { 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		marginBottom: 5 
	},
	titleStyle: { 
		color: 'white', 
		fontSize: 24
	}
});	
