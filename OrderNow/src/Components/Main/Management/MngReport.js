import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Picker, FlatList
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { filterBillByMonth, filterBillByDay } from './../../../Database/All_Schemas';

import HeaderBack from './../HeaderBack';

import { getFormattedDate, getFormattedTime } from './../../../Api/FormattedDateTime';
import getFormattedMoney from './../../../Api/FormattedMoney';

const { width, height } = Dimensions.get("window");

let checkInactiveIcon = require('./../../../Media/Icon/check-inactive.png');
let checkActiveIcon = require('./../../../Media/Icon/check-active.png');

export default class MgnReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBill: [],
      listMonth: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      selectedMonth: '1',
      selectedDay: getFormattedDate(new Date()),
      chosenTypeReport: '',
      revenue: 0
    };
  }

  onShowBillByMonth(month) {
    this.setState({ chosenTypeReport: 'month' });
    filterBillByMonth(month)
    .then(listBill => {
      this.setState({ listBill });
      this.onRevenue();
    })
    .catch(error => this.setState({ listBill: [], revenue: 0 }));
  }

  onShowBillByDay(day) {
    this.setState({ chosenTypeReport: 'day' });
    filterBillByDay(day)
    .then(listBill => {
      this.setState({ listBill });
      this.onRevenue();
    })
    .catch(error => this.setState({ listBill: [], revenue: 0 }));
  }

  onRevenue() {
    let revenue = 0;
    this.state.listBill.map(e => revenue += e.total);
    this.setState({ revenue });
  }

  render() {
    const { listBill, listMonth, selectedMonth, selectedDay, chosenTypeReport, revenue } = this.state;
    const { navigation } = this.props;
    const { container, wrapHeader, wrapChoose, cmbMonth,
            wrapTable, headerTable, headerWrapMaHD, headerWrapBan, headerWrapThoiGian, headerWrapTriGia, txtHeader,
            wrapItem, txtMaHD, txtBan, txtThoiGian, txtTriGia, wrapDoanhThu, btnDoanhThu, txtDoanhThu
          } = styles;

    return (
      <View style={ container }>
        <View>
          <HeaderBack 
            navigation={navigation}
            name="Management Report"
          />

          <View style={wrapHeader}>
            <View style={wrapChoose}>
              <TouchableOpacity
                onPress={() => this.onShowBillByMonth(selectedMonth)}
              >
                <Image source={chosenTypeReport === 'month' ? checkActiveIcon : checkInactiveIcon}/>
              </TouchableOpacity>
              <Picker
                style={cmbMonth}
                selectedValue={selectedMonth}                 
                mode="dropdown"
                onValueChange={itemValue => {
                  this.setState({ selectedMonth: itemValue });
                  this.onShowBillByMonth(itemValue);
                }}
              >
                { 
                  listMonth.map(e => (                   
                    <Picker.Item key={e} value={e} label={"Tháng " + e} />
                  )) 
                }
              </Picker>
            </View>

            <View style={wrapChoose}>
              <TouchableOpacity
                onPress={() => this.onShowBillByDay(selectedDay)}
              >
                <Image source={chosenTypeReport === 'day' ? checkActiveIcon : checkInactiveIcon}/>
              </TouchableOpacity>

              <DatePicker
                style={{width: 120, top: -10, marginLeft: 5}}
                date={selectedDay}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                  },
                  dateInput: {
                    marginRight: 36,
                    borderWidth: 0
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ selectedDay: date });
                  this.onShowBillByDay(date)
                }}
              />
            </View>
          </View>


          <View style={wrapTable}>
            <View style={headerTable}>
              <View style={headerWrapMaHD}>
                <TouchableOpacity 
                  onPress={() => {}}>                
                  <Text style={txtHeader}>Mã HD</Text>
                </TouchableOpacity>              
              </View>           
              <View style={headerWrapThoiGian}>
                <TouchableOpacity 
                  onPress={() => {}}>
                  <Text style={txtHeader}>Thời gian</Text>
                </TouchableOpacity>              
              </View>
              <View style={headerWrapTriGia}>
                <TouchableOpacity 
                  onPress={() => {}}>                
                  <Text style={txtHeader}>Trị giá</Text>
                </TouchableOpacity>              
              </View>           
            </View>


            <FlatList 
              data={listBill}
              renderItem={({item}) =>
                <View style={wrapItem}>
                  <View style={txtMaHD}>
                    <Text>{item.id}</Text>
                  </View>
                  <View style={txtThoiGian}>
                    <Text>{getFormattedTime(item.time) + " - " + getFormattedDate(item.time)}</Text>
                  </View>  
                  <View style={txtTriGia}>
                    <Text>{item.total.getFormattedMoney(0)}</Text>
                  </View>      
                </View>
              }      
              keyExtractor={item => item.id.toString()}
            />
          </View>

        </View>
        

        <View style={wrapDoanhThu}>
          <Text style={txtDoanhThu}>Doanh thu: {revenue.getFormattedMoney(0)} VNĐ</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  // ---> Header <---
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5
  },
  wrapChoose: {
    flexDirection: 'row',
    marginHorizontal: 5
  },
  cmbMonth: {
    height: 45,
    width: 110,
    marginTop: -11
  },

  // ---> Table Header <---
  wrapTable: {
    paddingHorizontal: 5,
    marginTop: 10 
  },
  headerTable: {
    flexDirection: 'row'
  },
  headerWrapMaHD: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  //headerWrapBan: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerWrapThoiGian: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  headerWrapTriGia: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  txtHeader: { 
    fontWeight: 'bold'
  },
  // ---> Table Item <---
  wrapItem: { 
    flexDirection: 'row',
    marginTop: 5, 
    alignItems: 'center' 
  },
  txtMaHD: { flex: 1, alignItems: 'center' },
  //txtBan: { flex: 1, alignItems: 'center' },
  txtThoiGian: { flex: 2, alignItems: 'center' },
  txtTriGia: { flex: 1, alignItems: 'center' },
  // ---> Doanh thu <---
  wrapDoanhThu: {
    padding: 5,
    backgroundColor: '#2ABB9C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtDoanhThu: {
    fontSize: 24
  }
});
