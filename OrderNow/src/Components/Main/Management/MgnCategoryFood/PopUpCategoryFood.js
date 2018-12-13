import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert
} from 'react-native';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';

import { insertNewCategoryFood, updateCategoryFood, deleteCategoryFood } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onClickUpdate } from './../../../../Redux/ActionCreators';

let monnuongIcon = require('./../../../../Media/Category/mon-nuong.png');

class PopUpCategoryFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
	}

	onAdd(newCategoryFood) {
		if(this.state.name == '')
			return alert('Vui lòng điền đầy đủ thông tin!');
		insertNewCategoryFood({
	      id: Math.floor(Date.now() / 1000),
	      name: newCategoryFood.name,
	      image: ''
	    })
	    .then(categoryFood => alert(`Thêm ${categoryFood.name} thành công!`))
	    .catch(error => alert(`Thêm thất bại!`));
		this.props.onCancelPopup();
	}

	onUpdate(categoryFood) {
		updateCategoryFood(categoryFood)
	    .then(() => alert('Sửa thành công'))
	    .catch(error => alert('Sửa thất bại'));
		this.props.onCancelPopup();
	}

	onDelete(categoryFood) {
		Alert.alert(
			'Xóa',
			`Xóa loại món ăn: ${categoryFood.name}`,
			[
				{
					text: 'Yes', onPress: () => {
						deleteCategoryFood(categoryFood.id)
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
		const { name } = this.state;
		const { title, categoryFood, isSave, isUpdate, visible,
				onCancelPopup, onClickUpdate } = this.props;
		const { wrapUpdate_Delete, btnFeature,
				wrapDialog, textInput, wrapBtnImage, imgLoaiMon, wrapAllBtn, wrapBtn, btnText } = styles;

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
	              onPress={() => this.onDelete({id: categoryFood.id, name})}
	            >
	              <Text>D</Text>
	            </TouchableOpacity>
			</View>
		);

		return (
			<Dialog
				dialogTitle={<DialogTitle title={title} />}
				width={0.8} height={isUpdate ? 300 : 250 }
				onShow={() => categoryFood == null ? this.setState({ name: '' }) : this.setState({ name: categoryFood.name })}
				visible={visible}
			>
				{isUpdate ? btnUpdate_delete : null}

				<View style={wrapDialog}>
					<View pointerEvents={isSave ? "auto" : "none"}>
						<TextInput
							style={textInput}
							placeholder="Nhập tên loại món ăn mới"
							autoCapitalize="none"
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ name: text })}
							value={name}
						/>
						<View style={wrapBtnImage}>
							<TouchableOpacity
								style={wrapBtn}
								onPress={() => {}}
							>
								<Text style={btnText}>Chọn ảnh</Text>
							</TouchableOpacity>
							<Image 
								style={imgLoaiMon}
								source={monnuongIcon}
							/>
						</View>
					</View>
					
					<View style={wrapAllBtn}>
						<TouchableOpacity
							style={wrapBtn}
							disabled={!isSave}
							onPress={() => isUpdate ? 
								this.onUpdate({ id: categoryFood.id, name, image: '' }) : 
								this.onAdd({ name })
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
		title: state.popUpCategoryFood.title,
		categoryFood: state.popUpCategoryFood.categoryFood,		
		isSave: state.showPopup.isSave,
		isUpdate: state.showPopup.isUpdate,
		visible: state.showPopup.visible,
	};
}

export default connect(mapStateToProps, { onCancelPopup, onClickUpdate })(PopUpCategoryFood);

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
  wrapBtnImage: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginHorizontal: 20,
  	marginBottom: 10,
  },
  imgLoaiMon: {
  	width: 75,
  	height: 50
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
