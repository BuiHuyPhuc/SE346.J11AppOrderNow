import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert, Picker
} from 'react-native';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';

import { insertNewEmployee, updateEmployee, deleteEmployee } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onClickUpdate } from './../../../../Redux/ActionCreators';

let profileIcon = require('./../../../../Media/Temp/profile.png');

class PopUpEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			name: '',
			listPosition: ['Nhân viên', 'Quản lý'],
			selectedPositon: 'Nhân viên'
		};
	}

	onAdd(newEmployee) {
		if(this.state.username == '' && this.state.password == '' && this.state.name == '')
			return alert('Vui lòng điền đầy đủ thông tin!');
		insertNewEmployee({
	      id: Math.floor(Date.now() / 1000),
	      username: newEmployee.username,
	      password: newEmployee.password,
	      name: newEmployee.name,
	      position: newEmployee.position,
	      decentralization: newEmployee.decentralization,
	      phone: newEmployee.phone,
	      image: newEmployee.image,
	    })
	    .then(categoryFood => alert(`Thêm ${categoryFood.name} thành công!`))
	    .catch(error => alert(`Thêm thất bại!`));
		this.props.onCancelPopup();
	}

	onUpdate(employee) {
		updateEmployee(employee)
	    .then(() => alert('Sửa thành công'))
	    .catch(error => alert('Sửa thất bại'));
		this.props.onCancelPopup();
	}

	onDelete(employee) {
		Alert.alert(
			'Xóa',
			`Xóa nhân viên: ${employee.name}`,
			[
				{
					text: 'Yes', onPress: () => {
						deleteEmployee(employee.id)
					    .then(() => alert('Xóa thành công'))
					    .catch(error => alert('Xóa thất bại'));
						this.props.onCancelPopup();
					}
				},
				{
					text: 'No', onPress: () => {},
					style: 'cancel'
				}				
			],
			{ cancelable: true }
		);
	}

	render() {
		const { username, password, name, listPosition, selectedPositon } = this.state;
		const { title, employee, isSave, isUpdate, visible,
				onCancelPopup, onClickUpdate } = this.props;
		const { wrapUpdate_Delete, btnFeature, wrapDialog, textInput, cmbPosition, 
				wrapBtnImage, imgProfile, wrapAllBtn, wrapBtn, btnText } = styles;

		const btnUpdate_delete = (
			<View style={wrapUpdate_Delete}>
				<TouchableOpacity
	              style={btnFeature}
	              onPress={() => onClickUpdate()}
	            >
	              <Text>U</Text>
	            </TouchableOpacity>
	            <TouchableOpacity
	              style={btnFeature}
	              onPress={() => this.onDelete({id: employee.id, name})}
	            >
	              <Text>D</Text>
	            </TouchableOpacity>
			</View>
		);

		return (
			<Dialog
				dialogTitle={<DialogTitle title={title} />}
				width={0.8} height={isUpdate ? 460 : 410 }
				onShow={() => employee == null ? this.setState({ username: '', password: '', name: '' }) : 
					this.setState({ username: employee.username, password: employee.password, name: employee.name, selectedPositon: employee.position })}
				visible={visible}
			>
			
				{isUpdate ? btnUpdate_delete : null}

				<View style={wrapDialog}>
					<View pointerEvents={isSave ? "auto" : "none"}>
						<TextInput
							style={textInput}
							placeholder="Nhập tài khoản mới"
							autoCapitalize="none"
							editable={employee == null ? true : false}
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ username: text })}
							value={username}
						/>
						<TextInput
							style={textInput}
							placeholder="Nhập mật khẩu mới"
							autoCapitalize="none"
							secureTextEntry
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ password: text })}
							value={password}
						/>
						<TextInput
							style={textInput}
							placeholder="Nhập tên nhân viên mới"
							autoCapitalize="none"
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ name: text })}
							value={name}
						/>
						<Picker
							style={cmbPosition}
					        selectedValue={selectedPositon}					        
					        mode="dropdown"
					        onValueChange={itemValue => this.setState({ selectedPositon: itemValue })}
					    >
					    	{ 
					    		listPosition.map(e => (					    			
					    			<Picker.Item key={e} value={e} label={e} />
					    		)) 
					    	}
					    </Picker>
						<View style={wrapBtnImage}>
							<TouchableOpacity
								style={wrapBtn}
								onPress={() => {}}
							>
								<Text style={btnText}>Chọn ảnh</Text>
							</TouchableOpacity>
							<Image 
								style={imgProfile}
								source={profileIcon}
							/>
						</View>
					</View>

					
					<View style={wrapAllBtn}>
						<TouchableOpacity
							style={wrapBtn}
							disabled={!isSave}
							onPress={() => isUpdate ? 
								this.onUpdate({ id: employee.id, password, name, position: selectedPositon, 
									decentralization: selectedPositon === "Quản lý" ? true : false,
									phone: '', image: '' 
								})
								: 
								this.onAdd({ username, password, name, position: selectedPositon, 
									decentralization: selectedPositon === "Quản lý" ? true : false,
									phone: '', image: '' 
								})
							}
						>
							<Text style={btnText}>Save</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={wrapBtn}
							onPress={() => onCancelPopup()}
						>
							<Text style={btnText}>Cancel</Text>
						</TouchableOpacity>
					</View>

				</View>
			</Dialog>
		);
	}
}

function mapStateToProps(state) {
	return {
		title: state.popUpEmployee.title,
		employee: state.popUpEmployee.employee,		
		isSave: state.showPopup.isSave,
		isUpdate: state.showPopup.isUpdate,
		visible: state.showPopup.visible,
	};
}

export default connect(mapStateToProps, { onCancelPopup, onClickUpdate })(PopUpEmployee);

const styles = StyleSheet.create({
  // ---> Update - Delete <---
  wrapUpdate_Delete: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 5
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
  // ---> Add <---
  wrapDialog: {
    marginTop: 5
  },
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: 'whitesmoke',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: '#2ABB9C',
    borderWidth: 1
  },
  cmbPosition: {
  	height: 45,
    marginHorizontal: 20,
    marginBottom: 10
  },
  wrapBtnImage: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginHorizontal: 20,
  	marginBottom: 10,
  },
  imgProfile: {
  	width: 75,
  	height: 50,
  	resizeMode: 'stretch'
  },
  wrapAllBtn: {
  	flexDirection: 'row',
  	justifyContent: 'center',
  	marginVertical: 10
  },
  wrapBtn: {
    marginHorizontal: 5,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    color: 'whitesmoke', 
    fontWeight: '600', 
    paddingHorizontal: 20
  }
});
