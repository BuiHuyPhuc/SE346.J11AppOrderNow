import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert
} from 'react-native';
import Dialog, { DialogTitle } from 'react-native-popup-dialog';

import { insertNewTable, deleteTable } from './../../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onCancelPopup } from './../../../../Redux/ActionCreators';

class PopUpTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			idTable: ''
		};
	}

	onAdd(idTable) {
		if(idTable == '')
			return alert('Vui lòng điền đầy đủ thông tin!');
		insertNewTable({
	      id: parseInt(idTable)
	    })
	    .then(table => alert(`Thêm bàn số ${table.id} thành công!`))
	    .catch(error => alert(`Thêm thất bại!`));
		this.props.onCancelPopup();
	}

	onDelete(idTable) {
		Alert.alert(
			'Xóa',
			`Xóa bàn số: ${idTable}`,
			[
				{
					text: 'Yes', onPress: () => {
						deleteTable(idTable)
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
		const { idTable } = this.state;
		const { title, table, isSave, isUpdate, visible, onCancelPopup } = this.props;
		const { wrapDelete, btnFeature,
				wrapDialog, textInput, wrapAllBtn, wrapBtn, btnText } = styles;

		const btnDelete = (
			<View style={wrapDelete}>
	            <TouchableOpacity
	              style={btnFeature}
	              onPress={() => this.onDelete(table.id)}
	            >
	              <Text>D</Text>
	            </TouchableOpacity>
			</View>
		);

		return (
			<Dialog
				dialogTitle={<DialogTitle title={title} />}
				width={0.8} height={isUpdate ? 230 : 180 }
				onShow={() => table == null ? this.setState({ idTable: '' }) : this.setState({ idTable: table.id.toString() })}
				visible={visible}
			>
				{isUpdate ? btnDelete : null}

				<View style={wrapDialog}>
					<View pointerEvents={isSave ? "auto" : "none"}>
						<TextInput
							style={textInput}
							placeholder="Nhập số bàn mới"
							autoCapitalize="none"
	              			underlineColorAndroid='transparent'
							onChangeText={text => this.setState({ idTable: text })}
							value={idTable}
						/>
					</View>
					
					<View style={wrapAllBtn}>
						<TouchableOpacity
							style={wrapBtn}
							disabled={!isSave}
							onPress={() => this.onAdd(idTable)}
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
		title: state.popUpTable.title,
		table: state.popUpTable.table,		
		isSave: state.showPopup.isSave,
		isUpdate: state.showPopup.isUpdate,
		visible: state.showPopup.visible,
	};
}

export default connect(mapStateToProps, { onCancelPopup })(PopUpTable);

const styles = StyleSheet.create({
  // ---> Update - Delete <---
  wrapDelete: {
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
