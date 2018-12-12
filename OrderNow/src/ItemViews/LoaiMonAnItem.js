import React, { Component } from 'react';
import {
  StyleSheet, View, Image, Text, TouchableOpacity
} from 'react-native';
import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

screenWidth = width < height ? width : height
screenHeight = width < height ? height : width
export default class LoaiMonAnItem extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            screenWidth,
            screenHeight,
        }
    }
    render()
    {
        screenWidth = width < height ? width : height;
        screenHeight = width < height ? height : width;
        return(
           
            <View style={LoaiMonAnCss.container} >
                <Image style={LoaiMonAnCss.image}
                  source={{uri: 'https://daynauan.info.vn/images/mon-viet/mon-suon-nuong.jpg'}}/>
                <View style={LoaiMonAnCss.info}>
                        <Text>{this.props.tenLoaiMonAn}</Text>
                        <Text>{this.props.hinh}</Text>

                </View>
            </View>
        )
    }
}
var LoaiMonAnCss= StyleSheet.create(
    {
        container:{
            width=0.4,
            height=0.25,
            flexDirection: 'column',
            backgroundColor: 'gray',
          
        },
        image:{
            margin:5,
            flex:(6/7),
        },
        info:{
            flex:1/7,
            backgroundColor:'green',
            alignItems:'center',
            padding:10,
        }
    }
)