import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Text, TouchableOpacity
} from 'react-native';
import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width
export default class MonAnItem extends React.Component
{
    render()
    {
        return(
            <View style={MonAnCss.container}>
                <Image style={MonAnCss.image}
                  source={{uri: 'https://daynauan.info.vn/images/mon-viet/mon-suon-nuong.jpg'}}/>
                <View style={MonAnCss.info}>
                        <Text>{this.props.tenMonAn}</Text>
                        <Text>{this.props.giaMonAn}</Text>
                        <Text>Số lượng:</Text>
                        <TouchableOpacity>
                            <Text >Thêm món</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
var MonAnCss= StyleSheet.create(
    {
        container:{
            width:screenWidth-20,
            height:screenHeight/4,
            flexDirection: 'row',
            backgroundColor: 'gray',
            padding:5,
        },
        image:{
            flex:(2/4),
        },
        info:{
            flex:3/6,
            flexDirection:'column',
            backgroundColor:'green',
            alignItems:'center',
            padding:10,
        }
    }
)