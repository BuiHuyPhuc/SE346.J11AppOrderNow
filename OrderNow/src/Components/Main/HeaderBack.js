import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Dimensions, Image
} from 'react-native';

const { width, height } = Dimensions.get("window");

export default class HeaderBack extends Component {
	render() {
		const { headerBack, btnBack, txtBack, imageStyle } = Styles;
		const { navigation, name } = this.props;
		return (
			<View style={headerBack}>
		        <TouchableOpacity
		          	style={btnBack}
		          	onPress={() => navigation.goBack()}
		        >
		        	<Image source={require('./../../Media/Icon/left.png')} 
					style={imageStyle}/>
	            	<Text style={txtBack}>{name}</Text>
		            <View />
		        </TouchableOpacity>
		    </View>
		);
	}
}

const Styles = StyleSheet.create({
	headerBack: {
		padding:10
	},
	btnBack: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	txtBack: {
		marginLeft:10,
		fontSize:28,
		color: 'black',
		fontWeight:'bold'
	},
	imageStyle:{
		resizeMode:'center',
		width:height/30,
		height:height/30,
	}
});
