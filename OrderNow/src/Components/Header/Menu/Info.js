import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { onEmployeeSignedIn } from './../../../Redux/ActionCreators';

import { updateEmployee } from './../../../Database/All_Schemas';

import HeaderBack from './../../Main/HeaderBack';

let profileIcon = require('./../../../Media/Temp/profile.png');

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const { height, width } = Dimensions.get('window');

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
      image: employee.image,
    };
  }

  onImagePicker() {
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
			} else if (response.error) {
			} else if (response.customButton) {
			} else {
				const source = response.uri;
		
				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
		
				this.setState({
					image: source,
				});
			}
		});
	}

	onAdd(newCategoryFood) {
		if(this.state.name == '')
			return alert('Vui lòng điền đầy đủ thông tin!');
		insertNewCategoryFood({
	      id: Math.floor(Date.now() / 1000),
	      name: newCategoryFood.name,
	      image: newCategoryFood.image
	    })
	    .then(categoryFood => alert(`Thêm ${categoryFood.name} thành công!`))
	    .catch(error => alert(`Thêm thất bại!`));
		this.props.onCancelPopup();
	}

  onUpdate(employee) {
    updateEmployee(employee)
      .then(() => alert('Sửa thành công'))
      .catch(error => alert('Sửa thất bại'));
    this.props.onEmployeeSignedIn(employee);
  }

  render() {
    const { username, password, name, position, phone, image } = this.state;
    const { navigation, employee } = this.props;
    const { container, wrapper, textInput, txtName,
      wrapBtnImage, btnChangeImage, imgProfile, btnChange, btnText,
    } = styles;
    return (
      <View style={container}>
        <HeaderBack
          navigation={navigation}
          name="Thông tin tài khoản"
        />

        <View style={wrapper}>
          <View style={wrapBtnImage}>
            <Image
              style={imgProfile}
              source={image == '' ? profileIcon : {uri: image}}
            />
            <Text style={txtName}>{name}</Text>
            <TouchableOpacity
              style={btnChangeImage}
              onPress={() => this.onImagePicker()}
            >
              <Text style={{ color: '#fe5644' }}>Thay đổi ảnh</Text>
            </TouchableOpacity>

          </View>

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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    employee: state.employeeSignedIn,
  }
}

export default connect(mapStateToProps, { onEmployeeSignedIn })(Info);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: 'whitesmoke',
  },
  wrapper: {
    marginHorizontal: 20,
    justifyContent:'center'
  },
  textInput: {
    height: height/16,
		backgroundColor: 'whitesmoke',
		padding: 10,
		borderRadius: 5,
    marginBottom: 10,
    opacity:0.8
  },
  txtName: {
    color: 'black',
    fontSize:22,
    fontWeight: 'bold',
    marginBottom:5
  },
  wrapBtnImage: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnChangeImage: {
    borderRadius: 5,
    width: width / 2,
    height: height / 28,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgProfile: {
    width: height / 10,
    height: height / 10,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 50
  },
  btnChange: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
		backgroundColor: '#fe5644',
		width: width / 2,
		height: height / 16,
    borderRadius: 5,
    marginTop:10
  },
  btnText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:14
  }
});
