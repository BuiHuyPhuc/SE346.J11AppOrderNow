import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './src/Redux/Store';

import { SignInStack } from './src/Components/Router';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SignInStack />
      </Provider>      
    );
  }
}
