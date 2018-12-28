import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, FlatList, Alert
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { filterUnpaidBill, updateBill } from './../../../Database/All_Schemas';

import getFormattedMoney from './../../../Api/FormattedMoney';

const { width, height } = Dimensions.get("window");
var isMouted = false;

export default class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUnpaidBill: [],
      search: ''
    };
    this.onReloadData();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onReloadData() {
    filterUnpaidBill()
      .then(listUnpaidBill => this.setState({ listUnpaidBill }))
      .catch(error => this.setState({ listUnpaidBill: [] }));
  }

  onPaidBill(bill, table) {
    Alert.alert(
      'Thanh toán',
      `Bàn số ${table} tổng tiền cần thanh toán ${bill.total.getFormattedMoney(0)} VNĐ`,
      [
        {
          text: 'Yes', onPress: () => {
            updateBill(bill)
              .then(() => alert('Thanh toán thành công'))
              .catch(error => alert('Thanh toán thất bại'));
          }
        },
        {
          text: 'No', onPress: () => { },
          style: 'cancel'
        }
      ],
      { cancelable: true }
    )
  }

  onSearch(searchText) {
    filterUnpaidBill()
      .then(listUnpaidBill => this.setState({ listUnpaidBill: listUnpaidBill.filter(item => item.table === parseInt(searchText)) }))
      .catch(error => this.setState({ listUnpaidBill: [] }));
  }

  render() {
    const { listUnpaidBill, search } = this.state;
    const { navigation } = this.props;
    const { container, wrapSearch, inputSearch,
      wrapItem, txtTitle, txtTongTien, btnThanhtoan, btnText
    } = styles;
    return (
      <View style={container}>
        <View style={wrapSearch}>
          <TextInput
            style={inputSearch}
            placeholder="Tìm kiếm bàn"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => {
              this.setState({ search: text })
              if (text == '')
                this.onReloadData();
              else
                this.onSearch(text);
            }}
          />
        </View>


        <FlatList
          data={listUnpaidBill}
          numColumns={2}
          renderItem={({ item }) =>
            <View style={wrapItem}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Screen_BillDetail', { table: item.table })}
              >
                <Text style={txtTitle}>Bàn {item.table}</Text>
                <Text style={txtTongTien}>{item.total.getFormattedMoney(0)} VNĐ</Text>
                <TouchableOpacity
                  style={btnThanhtoan}
                  onPress={() => this.onPaidBill(
                    { id: item.bill.id, status: true, time: new Date(), total: item.total },
                    item.table
                  )}
                >
                  <Text style={btnText}>Thanh toán</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            }
          keyExtractor={item => item.bill.id.toString()}
        />

      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if (isMouted)
        this.onReloadData();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  // ---> Header <---
  wrapSearch: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10
  },
  inputSearch: {
    height: height / 20,
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
  },
  // ---> List bill <---
  wrapItem: {
    width: (width - 40) / 2,
    padding: 10,
    margin: 10,
		borderRadius: 5,
		backgroundColor: 'white',
		elevation: 3
  },
 
  txtTitle: {
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
    fontSize:18,
    fontWeight:'bold'
  }, 
  txtTongTien: {
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
    fontSize:18,
  },  
  btnThanhtoan: { 
    alignSelf: 'center',
    justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fe5644',
		width: width / 3,
		height: height / 24,
		borderRadius: 5,
  },
  btnText: { 
    color:'white' ,
    fontWeight:'bold'
  }
});
