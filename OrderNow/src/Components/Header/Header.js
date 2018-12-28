import React, { Component } from 'react';
import {
	StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ImageBackground
} from 'react-native';

import { connect } from 'react-redux';
import { onSignOut } from './../../Redux/ActionCreators'

import menuIcon from './../../Media/Icon/menuIcon.png';
import logo from './../../Media/Icon/logo.png';

const { height,width } = Dimensions.get('window');

class Header extends Component {
	constructor(props) {
		super(props);
		this.props.onSignOut(this.props.navigation);
	}

	render() {
		const { onOpen, navigation } = this.props;
		const { wrapper, menuIconStyle, logoStyle } = styles;
		return (
			<View style={wrapper}>
				<TouchableOpacity onPress={onOpen}>
					<Image
						style={menuIconStyle}
						source={menuIcon}
					/>
				</TouchableOpacity>
				<Image
					source={logo}
					style={logoStyle}
				/>
				<View style={{width:height/28,height:height/28}}></View>
			</View>
		);
	}
}

export default connect(null, { onSignOut })(Header);

const styles = StyleSheet.create({
	wrapper: {	
		flexDirection: 'row',
		height: height / 12,	
		backgroundColor: 'white',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		padding: 20
	},
	menuIconStyle: {
		resizeMode: 'center',
		width: height/28,
		height: height/28,
	},
	logoStyle:{
		width:width/2,
		height:height/28, 
		resizeMode: 'center'
	}

});	
