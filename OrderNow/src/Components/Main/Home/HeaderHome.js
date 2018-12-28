import React, { Component } from 'react';
import {
	StyleSheet, View, Text, TextInput, Picker, Dimensions, TouchableOpacity
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { queryAllTable } from './../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onChooseTable, onChangeSearch } from './../../../Redux/ActionCreators';

const { width, height } = Dimensions.get("window");
var isMouted = false;

class HeaderHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listTable: [],
			selectedTable: 1,
			searchText: ''
		};
		this.onReloadData();
	}

	componentWillUnmount() {
		isMouted = false;
	}

	onReloadData() {
		queryAllTable()
			.then(listTable => this.setState({ listTable }))
			.catch(error => this.setState({ listTable: [] }));
	}

	render() {
		const { listTable, selectedTable, searchText } = this.state;
		const { onBackCategoryFood, onFilterData, onShowBill, onShowBillDetail,
			onChooseTable, onChangeSearch } = this.props;
		const { wrapHeader, inputSearch, wrapPickerStyle } = styles;
		return (
			<View style={wrapHeader}>
				<TextInput
					style={inputSearch}
					placeholder="Tìm kiếm món ăn"
					underlineColorAndroid='transparent'
					value={searchText}
					onChangeText={text => {
						this.setState({ searchText: text });
						onChangeSearch(text);
						if (text === '')
							onBackCategoryFood();
						else
							onFilterData(text);
					}}
				/>
				<View style={wrapPickerStyle}>
					<Picker
						selectedValue={selectedTable}
						mode="dropdown"
						onValueChange={itemValue => {
							this.setState({ selectedTable: itemValue });
							onChooseTable(itemValue);
						}}
					>
						{
							listTable != null ? listTable.map(table => (
								<Picker.Item key={table.id} value={table.id} label={"Bàn " + table.id.toString()} />
							)) : null
						}
					</Picker>
				</View>
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

export default connect(null, { onChooseTable, onChangeSearch })(HeaderHome);

const styles = StyleSheet.create({
	wrapHeader: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	inputSearch: {
		height: height/20,
		backgroundColor: 'whitesmoke',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10
	},
	wrapPickerStyle: {
		width: width - 40,
		borderWidth:0.8,
		borderColor:'#d6d6d6',
		borderRadius: 5,
		backgroundColor: 'white',
	}
});
