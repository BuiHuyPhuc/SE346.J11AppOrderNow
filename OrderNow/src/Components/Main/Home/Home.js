import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, Image, Dimensions, TextInput
} from 'react-native';

// import realm from '../../../Database/All_Schemas';
// import { queryAllCategoryFood } from '../../../Database/All_Schemas';

import ComboboxTable from './ComboboxTable';
import SourceImage from './SourceImage';

let monnuongIcon = require('./../../../Media/Category/mon-nuong.png');
const imgMonNuong = SourceImage(monnuongIcon);

const { width, height } = Dimensions.get("window");

// let FlatListItem=props=>{
//   const {itemIndex,id,tenLoaiMonAn,hinh, onPressItem}=props;

//   return(
//     <TouchableOpacity onPress={ onPressItem} >
//     <View  width={(screenWidth-20)/2}    height={screenHeight/4}   style={{ flexDirection: 'column' , backgroundColor: 'gray'}}>

//       <Image style={ {margin:5, flex:(6/7)}}
//       source={{uri: 'https://daynauan.info.vn/images/mon-viet/mon-suon-nuong.jpg'}}/>

//       <View style={{  flex:1/7, backgroundColor:'green', alignItems:'center', padding:10}}>
           
//             <Text>{itemIndex}</Text>
//      </View>
//     </View>
//     </TouchableOpacity>
//   );
// }

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
        //listCategoryFood: [],
        search: '',
    };
    // this.reloadData();
    // realm.addListener('change', () => {
    //     this.reloadData();
    //     console.log('Realm changed reloadData');
    // })
  }

  // reloadData = () => {
  //   queryAllCategoryFood()
  //   .then(listCategoryFood => this.setState({ listCategoryFood }))
  //   .catch(error => this.setState({listCategoryFood: [] }));
    
  //   console.log('reloadData', this.state.listCategoryFood);
  // }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    const { container, wrapHeader, inputSearch, wrapAllFeature, wrapFeature, btnFeature,
            wrapListCategory, wrapItemCategory, wrapText, txtNameCategory 
          } = styles;
    return (
      <View style={container}>
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search CategoryFood and Food"
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


        <View style={wrapListCategory}>
          <View style={wrapItemCategory}>
            <TouchableOpacity
              style={{ width: imgMonNuong.imgWidth }}
              onPress={() => navigation.navigate('Screen_CategoryDetail')}>
              <Image
                style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }}
                source={monnuongIcon}
              >                            
              </Image>
            </TouchableOpacity>
            <View style={wrapText}>
              <Text style={txtNameCategory}>Món Nướng</Text>
            </View>
          </View>

          <View style={wrapItemCategory}>
            <TouchableOpacity
              style={{ width: imgMonNuong.imgWidth }}
              onPress={() => navigation.navigate('Screen_CategoryDetail')}>
              <Image
                style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }}
                source={monnuongIcon}
              >                            
              </Image>
            </TouchableOpacity>
            <View style={wrapText}>
              <Text style={txtNameCategory}>Món Nướng</Text>
            </View>
          </View>

          <View style={wrapItemCategory}>
            <TouchableOpacity
              style={{ width: imgMonNuong.imgWidth }}
              onPress={() => navigation.navigate('Screen_CategoryDetail')}>
              <Image
                style={{ width: imgMonNuong.imgWidth, height: imgMonNuong.imgHeight }}
                source={monnuongIcon}
              >                            
              </Image>
            </TouchableOpacity>
            <View style={wrapText}>
              <Text style={txtNameCategory}>Món Nướng</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

// const categoryWidth = (width - 20) / 2;
// const categoryImageHeight = (categoryWidth / source.width) * source.height; 

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
  // ---> List Category <---
  wrapListCategory: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  wrapItemCategory: {
    marginTop: 10,
    paddingHorizontal: 5
  },
  wrapText: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  txtNameCategory: {
    fontSize: 24
  }
});

/*
<TouchableOpacity
          onPress={()=>{
              //Alert.alert("Clicked");
            const newLoaiMonAn={
              id: 93,
              tenLoaiMonAn:"PPPPP",
              hinh: "dsda",
            };
            insertNewLoaiMonAn(newLoaiMonAn).then().catch((error)=> {
              Alert.alert("LLLL");});
              console.log(`Item: `);
            }
          }
        >
          <Text>Thêm món ăn trong Code</Text>
        </TouchableOpacity>
                

        <FlatList
          data={this.state.loaiMonAn}
          numColumns={2}
          renderItem={({ item,index })=>
            <FlatListItem  
              {...item} 
              itemIndex={index}
              onPressItem={() => onCategoryDetail() }
            />
          }
          keyExtractor={item => item.id.toString()}
        />
*/
