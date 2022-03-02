import React from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
//redux 
import {connect} from 'react-redux'
import propTypes from 'prop-types'
const  User = ({userDetails}) =>  {

    return (
        <View style={{
            backgroundColor: '#1b262c',
            flex:1
        }}> 
            <Image
                    style={{
                      alignSelf: 'center',
                      borderRadius: 100,
                      width: 200,
                      height: 200,
                      marginTop:20
                    }}
                    size="20"
                    source={{uri: userDetails.image}}
                    alt="react-native"
                  />
          <Text style={styles.Text}>Name - {userDetails.name}</Text>
          <Text style={styles.Text}>Bio - {userDetails.bio}</Text>
          <Text style={styles.Text}>Country - {userDetails.country}</Text>
          <Text style={styles.Text}>InstaUserName - {userDetails.instaUserName}</Text>
        </View>
    );
  }

  const mapStateToProps = (state) => ({
    userDetails: state.auth.user
  })


  User.propTypes ={
    userDetails: propTypes.object,
  }

export default connect(mapStateToProps)(User)
const styles = StyleSheet.create({
    Text: {
      color:"#ffa24a",
      fontSize: 25,
      alignSelf: 'center',
      marginTop: 15,
      fontWeight:'bold'
    }
  });