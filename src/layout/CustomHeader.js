import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  console.log(authState);
  return (
    <View
      androidStatusBarColor="#0f4c75"
      style={{
        backgroundColor: '#0f4c75',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontSize: 25,
          padding: 8,
          marginVertical: 8,
          fontWeight: 'bold',
          color: '#ffffff',
        }}>
        InstaClone
      </Text>
      {authState.isAuthenticated && (
        <>
          <TouchableOpacity
            style={{
              fontWeight: '400',
              fontSize: 18,
              alignSelf: 'center',
              marginLeft: '24%',
            }}
            onPress={() => navigation.navigate('AddPost')}>
            <Text style={{color: '#fcb851'}}>ADD POST</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: '8%', marginTop: 20}}
            onPress={() => signOut()}>
            <AntDesign name="logout" size={30} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
