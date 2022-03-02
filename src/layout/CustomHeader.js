import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
          style={{marginTop: 20, 
          marginLeft: '7%'}}
          onPress={() => navigation.navigate('Home')}>
            <FontAwesome5 name="home" size={30} color="#ffa24a" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              marginLeft: '7%',
            }}
            onPress={() => navigation.navigate('AddPost')}>
            <MaterialIcons
              name="add-photo-alternate"
              size={32}
              color="#ffa24a"
            />
          </TouchableOpacity>
          <TouchableOpacity 
          style={{marginTop: 20, 
          marginLeft: '7%'}}
          onPress={() => navigation.navigate('User')}>
            <FontAwesome5 name="user-circle" size={30} color="#ffa24a" />
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
