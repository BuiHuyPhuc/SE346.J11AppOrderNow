import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions
} from 'react-native';

const { width, height } = Dimensions.get("window");

export default class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { search } = this.state;
    const { navigation } = this.props;
    const { container, wrapSearch, inputSearch,
            wrapList, wrapItem, wrapLeftItem, wrapRightItem, txtTitle, btnXem, btnThanhtoan, btnText 
          } = styles;
    return (
      <View style={container}>
        <View style={wrapSearch}>
          <TextInput 
            style={inputSearch}
            placeholder="Search"
            underlineColorAndroid='transparent'
            value={search}
            onChangeText={text => this.setState({ search: text })}
          />
        </View>       

        <View style={wrapList}>
          <View style={wrapItem}>
            <View style={wrapLeftItem}>
              <Text style={txtTitle}>Tên bàn</Text>
              <TouchableOpacity 
                style={btnXem}
                onPress={() => navigation.navigate('Screen_BillDetail')}>
                <Text style={btnText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>

            <View style={wrapRightItem}>
              <Text style={txtTitle}>Tổng tiền: $</Text>
              <TouchableOpacity 
                style={btnThanhtoan}
                onPress={() => {}}>
                <Text style={btnText}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={wrapItem}>
            <View style={wrapLeftItem}>
              <Text style={txtTitle}>Tên bàn</Text>
              <TouchableOpacity 
                style={btnXem}
                onPress={() => navigation.navigate('Screen_BillDetail')}>
                <Text style={btnText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>

            <View style={wrapRightItem}>
              <Text style={txtTitle}>Tổng tiền: $</Text>
              <TouchableOpacity 
                style={btnThanhtoan}
                onPress={() => {}}>
                <Text style={btnText}>Thanh toán</Text>
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
  wrapSearch: {
    paddingHorizontal: 10
  },
  inputSearch: {
    width: width - 20,
    height: height / 16,
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginVertical: 5
  },
  // ---> List bill <---
  wrapList: { 
    flexDirection: 'column', 
    paddingHorizontal: 5 
  },
  wrapItem: { 
    flexDirection: 'row', 
    borderWidth: 1, 
    marginTop: 5 
  },
  wrapLeftItem: { flex: 1, borderRightWidth: 1, justifyContent: 'center', alignItems: 'center' },
  wrapRightItem: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  txtTitle: { 
    fontSize: 24, 
    paddingVertical: 5 
  },
  btnXem: { paddingHorizontal: 5, marginBottom: 5, backgroundColor: '#2ABB9C' },
  btnThanhtoan: { paddingHorizontal: 65, marginBottom: 5, backgroundColor: '#2ABB9C' },
  btnText: { fontSize: 18 }
});
