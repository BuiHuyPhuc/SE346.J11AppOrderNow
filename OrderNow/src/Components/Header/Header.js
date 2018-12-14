import React, { Component } from 'react';
import {
	StyleSheet, Text, View, TouchableOpacity, Dimensions, Image
} from 'react-native';

import { connect } from 'react-redux';
import { onSignOut } from './../../Redux/ActionCreators'

import menuIcon from './../../Media/Icon/menu.png';
import logoIcon from './../../Media/Icon/logo.png';

const { height } = Dimensions.get('window');

class Header extends Component {
	constructor(props) {
		super(props);
		this.props.onSignOut(this.props.navigation);
	}

	render() {
		const { onOpen, navigation } = this.props;
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

export default connect(null, { onSignOut })(Header);

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
