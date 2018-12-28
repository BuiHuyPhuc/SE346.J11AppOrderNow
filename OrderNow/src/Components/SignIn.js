import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Image, ImageBackground
} from 'react-native';

import realm from './../Database/All_Schemas';
import { createAdmin, signInEmployee } from './../Database/All_Schemas';
import { insertEmployee, insertTable, insertCategoryFood, insertFood, insertBill, insertBillDetail } from './../Database/CreateDatabaseForTest';

import { connect } from 'react-redux';
import { onEmployeeSignedIn } from './../Redux/ActionCreators';

var isMouted = false;
let logoIcon = require('./../Media/Icon/logo.png');
let bg = require('./../Media/Icon/bg4.png');

const { height, width } = Dimensions.get('window');

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateAdmin: false,
      username: '',
      password: ''
    };
    this.onCreateAdmin();
  }

  componentWillUnmount() {
    isMouted = false;
  }

  onCreateAdmin() {
    createAdmin()
      .then(isCreateAdmin => {
        this.setState({ isCreateAdmin });
      })
      .catch(error => alert('Tạo database lỗi!'));
  }

  onCreateDatabase() {
    insertTable();
    insertCategoryFood();
    insertFood();
    insertBill();
    insertBillDetail();
    insertEmployee();
  }

  onSignIn(username, password) {
    if (!this.state.isCreateAdmin) {
      alert('Vui lòng tạo dữ liệu trước khi sử dụng!');
      return;
    }

    signInEmployee(username, password)
      .then(employee => {
        if (employee == null)
          alert('Tài khoản hoặc mật khẩu không chính xác!');
        else {
          this.props.onEmployeeSignedIn(employee);
          this.setState({ username: '', password: '' });
          this.props.navigation.navigate('Screen_AppOrderNow');
        }
      })
      .catch(error => console.log("error - signIn", error));
  }

  render() {
    const { username, password, isCreateAdmin } = this.state;
    const { container, bgStyle, loginStyle, imgLogo, textInput, btnLogin, btnText, btnCreateData, btnCreateDataText } = styles;

    const btnCreateDatabase = isCreateAdmin ? null :
      (
        <TouchableOpacity
          style={btnCreateData}
          onPress={() => this.onCreateDatabase()}
        >
          <Text style={btnCreateDataText}>Tạo dữ liệu trước khi sử dụng</Text>
        </TouchableOpacity>
      )

    return (
      <View style={container}>
        <Image style={bgStyle}
          source={bg}>
        </Image>
        <View style={{ height: height / 5, justifyContent:'center' }}>
          <Image
            style={imgLogo}
            source={logoIcon}
          >
          </Image>
        </View>

        <View style={loginStyle}>
          <TextInput
            style={textInput}
            placeholder="Tên tài khoản"
            placeholderTextColor="white"
            autoCapitalize="none"
            underlineColorAndroid='transparent'
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={textInput}
            placeholder="Mật khẩu"
            placeholderTextColor="white"
            autoCapitalize="none"
            secureTextEntry
            underlineColorAndroid='transparent'
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity
            style={btnLogin}
            onPress={() => this.onSignIn(username, password)}
          >
            <Text style={btnText}>Login</Text>
          </TouchableOpacity>
          {btnCreateDatabase}
        </View>
        <View style={{ height: height / 5 }}>
        
        </View>

      </View>
    );
  }

  componentDidMount() {
    isMouted = true;

    realm.addListener('change', () => {
      if (isMouted)
        this.onCreateAdmin();
    });
  }
}

export default connect(null, { onEmployeeSignedIn })(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  bgStyle: {
    width: width,
    height: height,
    position: 'absolute',
    resizeMode: 'cover'
  },
  loginStyle: {
    borderRadius: 5,
    width: width * 0.75,
  },
  imgLogo: {
    width: width * 0.75,
    height: height / 16,
    resizeMode: 'center',

  },
  textInput: {
    height: height / 16,
    backgroundColor: '#d6d6d6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    opacity: 0.8,
    color:'white',
    
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe5644',
    width: width * 0.75,
    height: height / 16,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  btnCreateData: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: width * 0.75,
    height: height / 16,
    borderRadius: 5,
    marginTop: 10
  },
  btnCreateDataText: {
    color: '#fe5644',
    fontWeight: 'bold',
    fontSize: 14
  },
});
