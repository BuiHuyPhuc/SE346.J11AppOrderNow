import React, { Component } from 'react';
import {
	StyleSheet, View, Text, Picker
} from 'react-native';

import { connect } from 'react-redux';
import { onChooseTable } from './../../../Redux/ActionCreators';

class ComboboxTable extends Component {
	constructor (props) {
	    super(props);
	    this.state = {
	    	listTable: ['1', '2', '3', '4', '5'],
	        chooseTable: ''
	    }
    }

    componentDidMount() {
    	this.setState({ chooseTable: this.props.table });
    }

    renderItem() {
    	items = [];
    	for(let item of this.state.listTable) {
    		itemText = "Bàn " + item;
    		items.push(<Picker.Item key={item} value={item} label={itemText} />)
    	}
    	return items;
    }

	render() {
		const { chooseTable } = this.state;
		const { container } = styles;
		return(
			<Picker
		        selectedValue={chooseTable}
		        style={container}
		        prompt="Chọn bàn"
		        mode="dropdown"
		        onValueChange={(itemValue, itemIndex) => {
		        	this.setState({ chooseTable: itemValue });
		        	this.props.onChooseTable(itemValue);
		        }}
		    >
		    	{ this.renderItem() }
		    </Picker>
		);
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
		width: 100,
    	height: 32,
	}
});
