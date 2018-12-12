import React, { Component } from 'react';
import { View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/Redux/Store';

import Drawer from 'react-native-drawer';
import { MainTabbar, MenuStack } from './src/Components/Router';

import Header from './src/Components/Header/Header';

export default class App extends Component {
  
  closeControlPanel = () => {
    this.drawer.close();
  };
  openControlPanel = () => {
    this.drawer.open();
  };

  render() {
    return (
      <Provider store={store}>
        <Drawer
          openDrawerOffset={0.2}
          tapToClose
          ref={(ref) => { this.drawer = ref; }}
          content={<MenuStack />}
        >
          <View style={{ flex: 1 }}>
            <Header onOpen={this.openControlPanel.bind(this)} />
            <MainTabbar />
          </View>
        </Drawer>
      </Provider>      
    );
  }
}
