import React, { Component } from 'react';
import { Dimensions, Image, View } from 'react-native';
import {
	StackNavigator, createBottomTabNavigator, createStackNavigator
} from 'react-navigation';

import { connect } from 'react-redux';

import SignIn from './SignIn';
import AppOrderNow from './AppOrderNow';

import Home from './Main/Home/Home';
import CategoryDetail from './Main/Home/CategoryDetail';
import Main from './Main/Home/Main';
import Order from './Main/Order/Order';
import Bill from './Main/Bill/Bill';
import BillDetail from './Main/Bill/BillDetail';

import Menu from './Header/Menu/Menu';
import Info from './Header/Menu/Info';

import Management from './Main/Management/Management';
import MngEmployee from './Main/Management/MngEmployee/MngEmployee';
import MngTable from './Main/Management/MngTable/MngTable';
import MngCategoryFood from './Main/Management/MngCategoryFood/MngCategoryFood';
import MngFood from './Main/Management/MngFood/MngFood';
import MngReport from './Main/Management/MngReport';

import homeIcon from './../Media/Icon/home.png';
import orderIcon from './../Media/Icon/order.png';
import billIcon from './../Media/Icon/bill.png';
import managementIcon from './../Media/Icon/management.png';

const { height } = Dimensions.get('window');

export const SignInStack = createStackNavigator({
	Screen_SignIn: SignIn,
	Screen_AppOrderNow: AppOrderNow
}, {
	headerMode: 'none'
});

export const HomeStack = createStackNavigator({
	Screen_Home: Home,
	Screen_CategoryDetail: CategoryDetail
}, {
	headerMode: 'none'
});

export const OrderStack = createStackNavigator({
	Screen_Order: Order
}, {
	headerMode: 'none'
});

export const BillStack = createStackNavigator({
	Screen_Bill: Bill,
	Screen_BillDetail: BillDetail
}, {
	headerMode: 'none'
});

export const ManagementStack = createStackNavigator({
	Screen_Management: Management,
	Screen_Mng_Employee: MngEmployee,
	Screen_Mng_Table: MngTable,
	Screen_Mng_CategoryFood: MngCategoryFood,
	Screen_Mng_Food: MngFood,	
	Screen_Mng_Report: MngReport
}, {
	headerMode: 'none'
});

export const MenuStack = createStackNavigator({
	Screen_Menu: Menu,
	Screen_Info: Info
}, {
	headerMode: 'none'
});

export const MainTabbarNV = createBottomTabNavigator({
	Home: Main,
	Order: OrderStack,
	Bill: BillStack
}, {
	navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = homeIcon;
        } else if (routeName === 'Order') {
          iconName = orderIcon;
        } else if (routeName === 'Bill') {
          iconName = billIcon;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Image source={iconName} style={{ width: 25, height: 25, tintColor }} />;
      },
    }),
	tabBarOptions: {
		style: {
			height: height / 12,
			backgroundColor: '#F8F8F8',
		},
		labelStyle: {
    		fontSize: 12
		},
		inactiveTintColor: '#B0B0B0',
		activeTintColor: '#2ABB9C',
		showIcon: true
	},
	animationEnabled: true,
  	swipeEnabled: true,
});

export const MainTabbarQL = createBottomTabNavigator({
	Home: Main,
	Order: OrderStack,
	Bill: BillStack,
	Management: ManagementStack
}, {
	navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = homeIcon;
        } else if (routeName === 'Order') {
          iconName = orderIcon;
        } else if (routeName === 'Bill') {
          iconName = billIcon;
        } else if (routeName === 'Management') {
          iconName = managementIcon;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Image source={iconName} style={{ width: 25, height: 25, tintColor }} />;
      },
    }),
	tabBarOptions: {
		style: {
			height: height / 12,
			backgroundColor: '#F8F8F8',
		},
		labelStyle: {
    		fontSize: 12
		},
		inactiveTintColor: '#B0B0B0',
		activeTintColor: '#2ABB9C',
		showIcon: true
	},
	animationEnabled: true,
  	swipeEnabled: true,
});

class MainTabbar extends Component {
	render() {
		return(
			<View style={{ flex: 1 }}>
				{ this.props.employeeSignedIn.decentralization ? <MainTabbarQL /> : <MainTabbarNV /> }
			</View>
		);
	}
} 

function mapStateToProps(state) {
	return {
		employeeSignedIn: state.employeeSignedIn
	};
}

export default connect(mapStateToProps)(MainTabbar);
