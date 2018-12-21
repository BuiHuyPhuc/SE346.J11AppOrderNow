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
	constructor (props) {
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
		const { container, wrapHeader, inputSearch, wrapAllFeature, wrapFeature, btnFeature, } = styles;
		return(
			<View style={wrapHeader}>
	          <TextInput 
	            style={inputSearch}
	            placeholder="Search"
	            underlineColorAndroid='transparent'
	            value={searchText}
	            onChangeText={text => {
	              this.setState({ searchText: text });
	              onChangeSearch(text);
	              if(text === '')
	                onBackCategoryFood();
	              else
	                onFilterData(text);
	            }}
	          />

	          <View style={wrapAllFeature}>
	            <Picker
					style={container}
			        selectedValue={selectedTable}
			        mode="dropdown"
			        onValueChange={itemValue => {
			        	this.setState({ selectedTable: itemValue });
			        	onChooseTable(itemValue);
			        }}
			    >
			    	{ 
			    		listTable != null ? listTable.map(table => (				    			
			    			<Picker.Item key={table.id} value={table.id} label={"Bàn số " + table.id.toString()} />
			    		)) : null
			    	}
			    </Picker>

	            <View style={wrapFeature}>
	              <TouchableOpacity
	                style={btnFeature}
	                onPress={() => onShowBill()}
	              >
	                <Text>a</Text>
	              </TouchableOpacity>
	              <TouchableOpacity
	                style={btnFeature}
	                onPress={() => onShowBillDetail()}
	              >
	                <Text>a</Text>
	              </TouchableOpacity>
	            </View>
	          </View>
	        </View>
		);
	}

	componentDidMount() {
		isMouted = true;

		realm.addListener('change', () => {
			if(isMouted)
				this.onReloadData();           
		});
	}
}

export default connect(null, { onChooseTable, onChangeSearch })(HeaderHome);

const styles = StyleSheet.create({
	container: {
		width: 120,
    	height: 32,
	},
  wrapHeader: {
    paddingHorizontal: 10,
    marginBottom: 5
  },
  inputSearch: {
    width: width - 20,
    height: height / 16,
    backgroundColor: 'whitesmoke',
    padding: 10,
    marginVertical: 5
  },
  wrapAllFeature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapFeature: {
    flexDirection: 'row',
  },
  btnFeature: {
    backgroundColor: '#2ABB9C',
    marginLeft: 5,
    width: 32,
    height: 32
  },
});
