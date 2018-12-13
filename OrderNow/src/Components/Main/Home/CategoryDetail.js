import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,Alert, FlatList, Image, Dimensions, TextInput
} from 'react-native';
// import realm from '../../../Database/All_Schemas';
// import { queryAllFoodByCategoryFood } from '../../../Database/All_Schemas';

import HeaderBack from './../HeaderBack';
import ComboboxTable from './ComboboxTable';
import SourceImage from './../../../Api/SourceImage';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window")

/*class FlatListMonAnItem extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      soLuong:0,
    };
  }
  render() {
    return(
      
      <View style={{width:screenWidth-20, height:screenHeight/4, flexDirection: 'row',backgroundColor: 'gray',
              padding:5}}>
                  <Image style={{ flex:(2/4)}}
                    source={{uri: 'https://daynauan.info.vn/images/mon-viet/mon-suon-nuong.jpg'}}/>
                  <View style={{ flex:3/6, flexDirection:'column', backgroundColor:'green', alignItems:'center',
              padding:10}}>
                          <Text>{this.props.monAnItem.tenMonAn}</Text>
                          <Text>{this.props.monAnItem.giaMonAn}</Text>
                          <View style={{ flex:3/6, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                          <TouchableOpacity style={{ flex:1/4}} onPress={() => {
                              if (this.state.soLuong>0) 
                                   this.setState({soLuong:this.state.soLuong-1});                                
                                }}>
                              <Text style={{fontSize:30}}>-</Text>
                            </TouchableOpacity >

                            <Text style={{ flex:1/2}}>Số lượng: {this.state.soLuong}</Text>
  
                           <TouchableOpacity style={{ flex:1/4}}  onPress={() => {
                                   this.setState({soLuong:this.state.soLuong+1});
                                }}>
                              <Text style={{fontSize:30}}>+</Text>
                            </TouchableOpacity>
                          </View>
                          
                          <TouchableOpacity   onPress={() => {
                                   //insertMonAnToLoaiMonAn(this.props.monAnItem,97);
                                }}>
                              <Text >Thêm món</Text>
                            </TouchableOpacity>
                  </View>
              </View>
    );
  }
}
*/
export default class CategoryDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
        search: ''
    };
  }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    const { container, wrapHeader, inputSearch, wrapAllFeature, wrapFeature, btnFeature,
            wrapListFood, wrapItemFood, wrapInfoFood, txtFood, wrapSoLuongFood, btnFood 
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Category Detail"
        />


        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => this.setState({ search: text })}
          />

          <View style={wrapAllFeature}>
            <ComboboxTable />

            <View style={wrapFeature}>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => {}}
              >
                <Text>a</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={btnFeature}
                onPress={() => {}}
              >
                <Text>a</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={wrapListFood}>
          <View style={wrapItemFood}>
            <Image
              style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }} 
              source={monnuongIcon}
            />
            <View style={wrapInfoFood}>
              <Text style={txtFood}>Tên món</Text>
              <Text style={txtFood}>Giá</Text>
              <View style={wrapSoLuongFood}>
                <TouchableOpacity
                  style={[btnFood, { width: 30 }]}
                  onPress={() => {}}
                >
                  <Text style={txtFood}>-</Text>
                </TouchableOpacity>
                <Text style={txtFood}>SL</Text>
                <TouchableOpacity
                  style={[btnFood, { width: 30 }]}
                  onPress={() => {}}
                >
                  <Text style={txtFood}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[btnFood, { width: imgMonNuong.imgWidth, backgroundColor: '#B0B0B0' }]}
                onPress={() => {}}
              >
                <Text style={txtFood}>Thêm món</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={wrapItemFood}>
            <Image
              style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }} 
              source={monnuongIcon}
            />
            <View style={wrapInfoFood}>
              <Text style={txtFood}>Tên món</Text>
              <Text style={txtFood}>Giá</Text>
              <View style={wrapSoLuongFood}>
                <TouchableOpacity
                  style={[btnFood, { width: 30 }]}
                  onPress={() => {}}
                >
                  <Text style={txtFood}>-</Text>
                </TouchableOpacity>
                <Text style={txtFood}>SL</Text>
                <TouchableOpacity
                  style={[btnFood, { width: 30 }]}
                  onPress={() => {}}
                >
                  <Text style={txtFood}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[btnFood, { width: imgMonNuong.imgWidth, backgroundColor: '#B0B0B0' }]}
                onPress={() => {}}
              >
                <Text style={txtFood}>Thêm món</Text>
              </TouchableOpacity>
            </View>
          </View>          
        </View>          
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // ---> Header <---
  wrapHeader: {
    paddingHorizontal: 10
  },
  inputSearch: {
    width: width - 20,
    height: height / 16,
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginVertical: 5
  },
  wrapAllFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapFeature: {
    flexDirection: 'row',
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
  // ---> List Food <---
  wrapListFood: {
    paddingHorizontal: 5
  },
  wrapItemFood: {    
    marginTop: 10,
    flexDirection: 'row'
  },
  wrapInfoFood: {
    marginLeft: 10,
    marginTop: -5,
    justifyContent: 'space-around'
  },
  txtFood: {
    fontSize: 18
  },
  wrapSoLuongFood: {
    flexDirection: 'row'
  },
  btnFood: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// <TouchableOpacity
//           onPress={() => {
//               //Alert.alert("Clicked");
//             const newMonAn = {
//               id: 5,
//               tenMonAn:"Sườn rammmm",
//               giaMonAn: 60000,
//             };
//             insertNewMonAn(newMonAn).then()
//             .catch(error => Alert.alert("LLLL"));
//             console.log(`Item: `);        
//           }
//         }
//         >
//           <Text>Thêm món ăn trong Code</Text>
//         </TouchableOpacity>

        
//         <FlatList
//           data={this.state.monAn}
//           numColumns={1}
//           renderItem={({item,index}) =>
//             <FlatListMonAnItem
//               monAnItem={item} 
//               itemIndex={index}
//               onPressItem={() => alert(`You pressed item`)}
//             />
//           }
//           keyExtractor = {item => item.id.toString()}
//         />
