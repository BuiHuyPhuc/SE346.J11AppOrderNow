import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Dimensions, Image
} from 'react-native';

import { connect } from 'react-redux';

let profileIcon = require('./../../../Media/Temp/profile.png');

const { height, width } = Dimensions.get('window');

class Menu extends Component {
  render() {
    const { navigation, signOut, employeeSignedIn } = this.props;
    const { container, imgProfile, txtTen, btnWrap, btnText, btnSignOut, btnSignOutText } = styles;
    return (
      <View style={container}>
        <Image
          style={imgProfile}
          source={employeeSignedIn.image == '' ? profileIcon : {uri: employeeSignedIn.image}}
        />
        <Text style={txtTen}>{employeeSignedIn.name}</Text>
        <TouchableOpacity
          style={btnWrap}
          onPress={() => navigation.navigate('Screen_Info')}
        >
          <Text style={btnText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btnSignOut}
          onPress={() => signOut.goBack()}
        >
          <Text style={btnSignOutText}>Sign out</Text>
        </TouchableOpacity>

      </View >
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
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: 'whitesmoke',
    padding: 20,
    alignItems:'center'
  },
  imgProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: height / 10,
    height: height / 10,
    resizeMode: 'cover',
    marginVertical: 10,
    borderRadius: 50
  },
  txtTen: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom:50
  },
  btnWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe5644',
    width: width / 2,
    height: height / 16,
    borderRadius: 5,
    marginTop: 10
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  btnSignOut: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: width / 2,
    height: height / 16,
    borderRadius: 5,
    marginTop: 10
  },
  btnSignOutText: {
    color: '#fe5644',
    fontWeight: 'bold',
    fontSize: 14
  }
});
