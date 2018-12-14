import React, { Component } from 'react';
import {
	StyleSheet, View, Text, Picker
} from 'react-native';

import realm from './../../../Database/All_Schemas';
import { queryAllTable } from './../../../Database/All_Schemas';

import { connect } from 'react-redux';
import { onChooseTable } from './../../../Redux/ActionCreators';

class ComboboxTable extends Component {
	constructor (props) {
	    super(props);
	    this.state = {
	    	listTable: [],
	    	selectedTable: ''
	    };
	    this.onReloadData();
	    realm.addListener('change', () => {
	      this.onReloadData();    
	    });
    }

    onReloadData() {
	    queryAllTable()
	    .then(listTable => this.setState({ listTable }))
	    .catch(error => this.setState({ listTable: [] }));
	}

	render() {
		const { listTable, selectedTable } = this.state;
		const { container } = styles;
		return(
			<Picker
				style={container}
		        selectedValue={selectedTable}
		        mode="dropdown"
		        onValueChange={itemValue => {
		        	this.setState({ selectedTable: itemValue });
		        	this.props.onChooseTable(itemValue);
		        }}
		    >
		    	{ 
		    		listTable != null ? listTable.map(table => (				    			
		    			<Picker.Item key={table.id} value={table.id} label={"Bàn số " + table.id.toString()} />
		    		)) : null
		    	}
		    </Picker>
		);
	}

	componentDidMount() {
		this.setState({ selectedTable: this.props.table })
	}
}

function mapStatetoProps(state) {
	return {
		table: state.chooseTable
	};
}

export default connect(mapStatetoProps, { onChooseTable })(ComboboxTable);

const styles = StyleSheet.create({
	container: {
		width: 120,
    	height: 32,
	}
});
