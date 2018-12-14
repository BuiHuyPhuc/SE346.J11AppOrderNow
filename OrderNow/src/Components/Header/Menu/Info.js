import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Image
} from 'react-native';

import { connect } from 'react-redux';

import { updateEmployee } from './../../../Database/All_Schemas';

import HeaderBack from './../../Main/HeaderBack';

let profileIcon = require('./../../../Media/Temp/profile.png');

class Info extends Component {
  constructor(props) {
    super(props);
    const { employee } = this.props;
    this.state = {
      username: employee.username,
      password: employee.password,
      name: employee.name,
      position: employee.position,
      phone: employee.phone,
      image: employee.image
    };
  }

  onUpdate(employee) {
    updateEmployee(employee)
      .then(() => alert('Sửa thành công'))
      .catch(error => alert('Sửa thất bại'));
  }

  render() {
    const { username, password, name, position, phone, image } = this.state;
    const { navigation, employee } = this.props;
    const { container, wrapper, textInput, txtPosotion,
            wrapBtnImage, btnChangeImage, imgProfile, btnChange, btnText,
          } = styles;
    return (
      <View style={container}>
        <HeaderBack 
          navigation={navigation}
          name="Info User"
        />

        <View style={wrapper}>
          <Text style={txtPosotion}>Chức vụ: {position}</Text>
          <TextInput
              style={textInput}
              placeholder="Nhập tài khoản của bạn"
              autoCapitalize="none"
              editable={false}
              underlineColorAndroid='transparent'
              value={username}
              onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Nhập mật khẩu của bạn"
              autoCapitalize="none"
              secureTextEntry
              underlineColorAndroid='transparent'
              value={password}
              onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Nhập họ và tên của bạn"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={name}
              onChangeText={text => this.setState({ name: text })}
          />
          <TextInput
              style={textInput}
              placeholder="Nhập số điện thoại của bạn"
              autoCapitalize="none"
              underlineColorAndroid='transparent'
              value={phone}
              onChangeText={text => this.setState({ phone: text })}
          />
          <View style={wrapBtnImage}>
            <TouchableOpacity
              style={btnChangeImage}
              onPress={() => {}}
            >
              <Text style={btnText}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
            <Image 
              style={imgProfile}
              source={profileIcon}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={btnChange}
          onPress={() => this.onUpdate({ 
              id: employee.id, password, name, position, 
              decentralization: position === "Quản lý" ? true : false,
              phone, image
            })
          }
        >
          <Text style={btnText}>Lưu thông tin</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    employee: state.employeeSignedIn,
  }
}

export default connect(mapStateToProps)(Info);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    borderRightWidth: 2,
    borderColor: 'whitesmoke',
    justifyContent: 'space-between'
  },
  wrapper: {
    flex: 10,
    justifyContent: 'center',
    marginHorizontal: 20
  },
  textInput: {
    height: 45,
    backgroundColor: 'whitesmoke',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  txtPosotion: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black'
  },
  wrapBtnImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  btnChangeImage: {
    marginHorizontal: 5,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    width: 190,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  imgProfile: {
    width: 75,
    height: 50,
    resizeMode: 'stretch'
  },
  btnChange: {
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 20
  },
  btnText: {
    color: 'whitesmoke', 
    fontWeight: '600', 
    paddingHorizontal: 20
  }
});
