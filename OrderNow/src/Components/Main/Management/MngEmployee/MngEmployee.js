import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, FlatList
} from 'react-native';

import realm from './../../../../Database/All_Schemas';
import { queryAllEmployee } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
         onPopupAddEmployee, onPopupUpdateDeleteEmployee } from './../../../../Redux/ActionCreators';

import HeaderBack from './../../HeaderBack';
import PopUpEmployee from './PopUpEmployee';

const { width, height } = Dimensions.get("window");
var isMounted = false;

class MngEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEmployee: [],
      search: ''
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMounted = false;
  }

  onReloadData() {
    queryAllEmployee()
    .then(listEmployee => this.setState({ listEmployee }))
    .catch(error => this.setState({ listEmployee: [] }));
  }

  onSearch(searchText) {
    queryAllEmployee()
    .then(listEmployee => this.setState({ listEmployee: listEmployee.filter(item => (item.position.search(searchText)  > -1) || (item.name.search(searchText) > -1)) }))
    .catch(error => this.setState({ listEmployee: [] }));
  }

  render() {
    const { listEmployee, search } = this.state;
    const { navigation, onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
            onPopupAddEmployee, onPopupUpdateDeleteEmployee } = this.props;
    const { container, wrapHeader, inputSearch, wrapFeature, btnFeature,
            headerTable, headerWrapChucVu, headerWrapTen, headerWrapSdt, txtHeader,
            wrapItem, txtChucVu, txtTen, txtSdt 
          } = styles;
    return (
      <View style={container}>
      <HeaderBack
          navigation={navigation}
          name="Management Employee"
        />

        <View style={wrapHeader}>
          <TextInput 
            style={inputSearch}
            placeholder="Tìm kiếm chức vụ hoặc nhân viên ..."
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => {
              this.setState({ search: text });
              if(text == '')
                this.onReloadData();
              else
                this.onSearch(text);
            }}
          />
          <View style={wrapFeature}>
            <TouchableOpacity
              style={btnFeature}
              onPress={() => {                
                onShowPopupAdd();
                onPopupAddEmployee();
              }}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={headerTable}>
          <View style={headerWrapChucVu}>
            <TouchableOpacity 
              onPress={() => {}}>                
              <Text style={txtHeader}>Chức vụ</Text>
            </TouchableOpacity>              
          </View>
          <View style={headerWrapTen}>
            <TouchableOpacity 
              onPress={() => {}}>                
              <Text style={txtHeader}>Tên nhân viên</Text>
            </TouchableOpacity>              
          </View>            
          <View style={headerWrapSdt}>
            <TouchableOpacity 
              onPress={() => {}}>                
              <Text style={txtHeader}>Số điện thoại</Text>
            </TouchableOpacity>              
          </View>           
        </View>

        <FlatList
          data={listEmployee}
          renderItem={({item}) =>
            <TouchableOpacity 
              style={wrapItem}
              onPress={() => {
                onShowPopupUpdateDelete();
                onPopupUpdateDeleteEmployee(item);
              }}
            >
            <View style={txtChucVu}>
              <Text>{item.position}</Text>
            </View>
            <View style={txtTen}>
              <Text>{item.name}</Text>
            </View>
            <View style={txtSdt}>
              <Text>{item.phone}</Text>
            </View>       
            </TouchableOpacity> 
          }
          keyExtractor={item => item.id.toString()}
        />

        <PopUpEmployee />
      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if(isMouted)
        this.onReloadData();           
    });
  }  
}

export default connect(null, { onCancelPopup, onShowPopupAdd, onShowPopupUpdateDelete,
  onPopupAddEmployee, onPopupUpdateDeleteEmployee })(MngEmployee);

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
  // ---> Table Header <---
  headerTable: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 10 
  },
  headerWrapChucVu: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapTen: { flex: 4, justifyContent: 'center', alignItems: 'center' },
  headerWrapSdt: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold', 
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtChucVu: { flex: 2, alignItems: 'center' },
  txtTen: { flex: 4, alignItems: 'center' },
  txtSdt: { flex: 3, alignItems: 'center' },
});
