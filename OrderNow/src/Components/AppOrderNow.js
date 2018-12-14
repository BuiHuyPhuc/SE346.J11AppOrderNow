import React, { Component } from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';
import store from './../Redux/Store';

import Drawer from 'react-native-drawer';
import { MainTabbar, MenuStack } from './Router';

import Header from './Header/Header';

export default class AppOrderNow extends Component {
  
  closeControlPanel = () => {
    this.drawer.close();
  };
  openControlPanel = () => {
    this.drawer.open();
  };

  render() {
    return (
      <Drawer
        openDrawerOffset={0.2}
        tapToClose
        ref={(ref) => { this.drawer = ref; }}
        content={<MenuStack />}
      >
        <View style={{ flex: 1 }}>
          <Header 
            onOpen={this.openControlPanel.bind(this)}
            navigation={this.props.navigation}
          />
          <MainTabbar />
        </View>
      </Drawer>      
    );
  }
}
