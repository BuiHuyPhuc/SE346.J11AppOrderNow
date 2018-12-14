import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';

import { connect } from 'react-redux';

import profileIcon from './../../../Media/Temp/profile.png';

class Menu extends Component {
  render() {
    const { navigation, signOut } = this.props;
    const { container, imgProfile, wrapLogin, txtTen, btnSignIn, btnText } = styles;
    return (
      <View style={container}>
        <Image 
          style={imgProfile}
          source={profileIcon} 
        />

        <View style={wrapLogin}>
          <Text style={txtTen}>Bùi Huy Phúc</Text>
          
          <View>          
            <TouchableOpacity 
              style={btnSignIn}
              onPress={() => navigation.navigate('Screen_Info')}
            >
              <Text style={btnText}>Change Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={btnSignIn}
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
    signOut: state.signOut
  }
}

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#2ABB9C',
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
    fontSize: 24, 
    color: 'whitesmoke'
  },
  btnSignIn: {
    height: 60,
    width: 280,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  btnText: {
    fontSize: 24
  }
});
