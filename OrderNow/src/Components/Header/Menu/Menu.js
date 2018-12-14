import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';

import { connect } from 'react-redux';

import profileIcon from './../../../Media/Temp/profile.png';

class Menu extends Component {
  render() {
    const { navigation, signOut, employeeSignedIn } = this.props;
    const { container, imgProfile, wrapLogin, txtTen, btnWrap, btnText } = styles;
    return (
      <View style={container}>
        <Image 
          style={imgProfile}
          source={profileIcon} 
        />

        <View style={wrapLogin}>
          <Text style={txtTen}>{employeeSignedIn.name}</Text>
          
          <View>          
            <TouchableOpacity 
              style={btnWrap}
              onPress={() => navigation.navigate('Screen_Info')}
            >
              <Text style={btnText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={btnWrap}
              onPress={() => signOut.goBack()}         
            >
              <Text style={btnText}>Sign out</Text>
            </TouchableOpacity>
          </View>

          <View />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    employeeSignedIn: state.employeeSignedIn,
    signOut: state.signOut
  }
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'whitesmoke',
    borderRightWidth: 2,
    borderColor: 'whitesmoke',
    alignItems: 'center'
  },
  imgProfile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 30
  },
  wrapLogin: {
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  txtTen: {
    fontSize: 32,
    color: 'black'
  },
  btnWrap: {
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    marginVertical: 10,
    width: 280,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    color: 'whitesmoke',
    fontSize: 26,
  }
});
