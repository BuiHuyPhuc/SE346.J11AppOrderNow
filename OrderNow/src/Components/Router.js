import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import {
	StackNavigator, createBottomTabNavigator
} from 'react-navigation';

import Home from './Main/Home/Home';
import CategoryDetail from './Main/Home/CategoryDetail';
import Order from './Main/Order/Order';
import Bill from './Main/Bill/Bill';
import BillDetail from './Main/Bill/BillDetail';

import Menu from './Header/Menu/Menu';
import Info from './Header/Menu/Info';

import Management from './Main/Management/Management';
import MgnEmployee from './Main/Management/MgnEmployee';
import MgnTable from './Main/Management/MngTable';
import MgnCategoryFood from './Main/Management/MgnCategoryFood/MgnCategoryFood';
import MgnFood from './Main/Management/MgnFood/MgnFood';
import MgnReport from './Main/Management/MgnReport';

import homeIcon from './../Media/Icon/home.png';
import orderIcon from './../Media/Icon/order.png';
import billIcon from './../Media/Icon/bill.png';
import managementIcon from './../Media/Icon/management.png';

const { height } = Dimensions.get('window');

export const HomeStack = StackNavigator({
	Screen_Home: Home,
	Screen_CategoryDetail: CategoryDetail
}, {
	headerMode: 'none'
});

export const OrderStack = StackNavigator({
	Screen_Order: Order
}, {
	headerMode: 'none'
});

export const BillStack = StackNavigator({
	Screen_Bill: Bill,
	Screen_BillDetail: BillDetail
}, {
	headerMode: 'none'
});

export const ManagementStack = StackNavigator({
	Screen_Management: Management,
	Screen_Mng_Employee: MgnEmployee,
	Screen_Mng_Table: MgnTable,
	Screen_Mng_CategoryFood: MgnCategoryFood,
	Screen_Mng_Food: MgnFood,	
	Screen_Mng_Report: MgnReport
}, {
	headerMode: 'none'
});

export const MenuStack = StackNavigator({
	Screen_Menu: Menu,
	Screen_Info: Info
}, {
	headerMode: 'none'
});

export const MainTabbar = createBottomTabNavigator({
	Home: HomeStack,
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
