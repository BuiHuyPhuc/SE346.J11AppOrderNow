import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert, Picker
} from 'react-native';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';

import { queryAllCategoryFood, insertNewFood, updateFood, deleteFood } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup, onClickUpdate } from './../../../../Redux/ActionCreators';

let monnuongIcon = require('./../../../../Media/Category/mon-nuong.png');

class PopUpFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listCategoryFood: [],
			name: '',
			price: '',
			selectedCategoryFoodId: null
		};
		this.onLoadListCategoryFood();		
	}

	onLoadListCategoryFood() {
	   	queryAllCategoryFood()
	    .then(listCategoryFood => {
	    	this.setState({ listCategoryFood });
	    	listCategoryFood.slice(0, 1).map(e => this.setState({ selectedCategoryFoodId: e.id }));
	    })
	    .catch(error => this.setState({ listCategoryFood: [] }));
	}

	onAdd(newFood) {
		if(this.state.name == '' || this.state.price == '')
			return alert('Vui lòng điền đầy đủ thông tin!');
		insertNewFood({
	      id: Math.floor(Date.now() / 1000),
	      name: newFood.name,
	      price: parseInt(newFood.price),
	      image: newFood.image,
	      idCategoryFood: newFood.idCategoryFood
	    })
	    .then(food => alert(`Thêm ${food.name} thành công!`))
	    .catch(error => alert(`Thêm thất bại!`));
		this.props.onCancelPopup();
	}

	onUpdate(food) {
		updateFood(food)
	    .then(() => alert('Sửa thành công'))
	    .catch(error => alert('Sửa thất bại'));
		this.props.onCancelPopup();
	}

	onDelete(food) {
		Alert.alert(
			'Xóa',
			`Xóa món ăn: ${food.name}`,
			[
			{
					text: 'Yes', onPress: () => {
						deleteFood(food.id)
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
		const { listCategoryFood, name, price, selectedCategoryFoodId } = this.state;
		const { title, food, isSave, isUpdate, visible, chooseCategoryFoodId,
				onCancelPopup, onClickUpdate } = this.props;
		const { wrapUpdate_Delete, btnFeature, wrapDialog, textInput, cmbCategoryFood, 
				wrapBtnImage, imgLoaiMon, wrapAllBtn, wrapBtn, btnText } = styles;

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
	              onPress={() => this.onDelete({id: food.id, name})}
	            >
	              <Text>D</Text>
	            </TouchableOpacity>
			</View>
		);

		return (
			<Dialog
				dialogTitle={<DialogTitle title={title} />}
				width={0.8} height={isUpdate ? 400 : 350}
				onShow={() => food == null ? this.setState({ name: '', price: '' }) : this.setState({ 
					name: food.name,
					price: food.price.toString(),
					selectedCategoryFoodId: food.idCategoryFood
				})}
				visible={visible}
			>
				{isUpdate ? btnUpdate_delete : null}

				<View style={wrapDialog}>
					<View pointerEvents={isSave ? "auto" : "none"}>
						<TextInput
							style={textInput}
							placeholder="Nhập tên món ăn mới"
							autoCapitalize="none"
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ name: text })}
							value={name}
						/>
						<TextInput
							style={textInput}
							placeholder="Nhập giá món ăn mới"
							autoCapitalize="none"
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ price: text })}
							value={price}
						/>
						<Picker
							style={cmbCategoryFood}
					        selectedValue={selectedCategoryFoodId}					        
					        mode="dropdown"
					        onValueChange={itemValue => this.setState({ selectedCategoryFoodId: itemValue})}
					    >
					    	{ 
					    		listCategoryFood.map(e => (					    			
					    			<Picker.Item key={e.id} value={e.id} label={e.name} />
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
								this.onUpdate({ id:food.id , name, price: parseInt(price), image: '', idCategoryFood: selectedCategoryFoodId }) :
								this.onAdd({ name, price, image: '', idCategoryFood: selectedCategoryFoodId })
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
		title: state.popUpFood.title,
		food: state.popUpFood.food,		
		isSave: state.showPopup.isSave,
		isUpdate: state.showPopup.isUpdate,
		visible: state.showPopup.visible,
	};
}

export default connect(mapStateToProps, { onCancelPopup, onClickUpdate })(PopUpFood);

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
  cmbCategoryFood: {
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
