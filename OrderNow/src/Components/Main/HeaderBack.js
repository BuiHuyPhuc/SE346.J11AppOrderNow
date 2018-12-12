import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, Image
} from 'react-native';

const { width, height } = Dimensions.get("window");

export default class HeaderBack extends Component {
	render() {
		const { headerBack, btnBack, txtBack } = Styles;
		const { navigation, name } = this.props;
		return (
			<View style={headerBack}>
		        <TouchableOpacity
		          	style={btnBack}
		          	onPress={() => navigation.goBack()}
		        >
		        	<Image source={require('./../../Media/Icon/left.png')} />
	            	<Text style={txtBack}>{name}</Text>
		            <View />
		        </TouchableOpacity>
		    </View>
		);
	}
}

const Styles = StyleSheet.create({
	headerBack: {
		height: height / 12,
	},
	btnBack: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10
	},
	txtBack: {
		fontSize: 20
	}
});
