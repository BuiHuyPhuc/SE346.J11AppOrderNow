import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput
} from 'react-native';

import realm from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete, onLoadListTable,
         onPopupAddTable, onPopupDeleteTable } from './../../../../Redux/ActionCreators';

import HeaderBack from './../../HeaderBack';
import PopUpTable from './PopUpTable';
import SourceImage from './../../../../Api/SourceImage';

const { width, height } = Dimensions.get("window");

let tableIcon = require('./../../../../Media/Temp/table.png');
const imgTable = SourceImage(tableIcon);

class MngTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listTable: [],
      search: ''
    };
    realm.addListener('change', () => {
      this.onReloadData();
    });
  }

  onReloadData() {
    this.setState({ listTable: this.props.listTable });
    this.props.onLoadListTable();    
  }
  
  render() {
    const { search, listTable } = this.state;
    const { navigation, onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
            onPopupAddTable, onPopupDeleteTable } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature ,            
            wrapItemTable, wrapText, txtNameTable
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Management Table"
        />        
        
        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => this.setState({ search: text })}
          />
          <View style={wrapFeature}>
            <TouchableOpacity
              style={btnFeature}
              onPress={() => {                
                onShowPopupAdd();
                onPopupAddTable();
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList 
          data={listTable}
          numColumns={2}
          renderItem={({item}) =>
            <View style={wrapItemTable}>
              <TouchableOpacity
                style={{ width: imgTable.imgWidth }}
                onPress={() => {
                  onShowPopupUpdateDelete();
                  onPopupDeleteTable(item);
                }}
              >
                <Image
                  style={{ width: imgTable.imgWidth, height: imgTable.imgHeight }}
                  source={tableIcon}
                >                            
                </Image>
              </TouchableOpacity>
              <View style={wrapText}>
                <Text style={txtNameTable}>Bàn số {item.id}</Text>
              </View>
            </View>
          }      
          keyExtractor={item => item.id.toString()}
        />

        
        <PopUpTable />
      </View>
    );
  }

  componentDidMount() {
    this.onReloadData();
  }
}

function mapStateToProps(state) {
  return {
    listTable: state.listTable._55
  };
}

export default connect(mapStateToProps, { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
  onPopupAddTable, onPopupDeleteTable, onLoadListTable })(MngTable);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  wrapFeature: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
  // ---> List Table <---
  wrapItemTable: {
    marginTop: 5,
    paddingHorizontal: 5
  },
  wrapText: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  txtNameTable: {
    fontSize: 24
  }
});
