import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, ListViewComponent } from 'react-native';
import {Center, Container,} from 'native-base'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//redux 
import {connect} from 'react-redux'
import {getPost} from '../action/post'
import propTypes from 'prop-types'

import EmptyContainer from '../components/EmptyContainer'
import Post from '../components/Post'
import AddPost from './AddPost';
const  Home = ({getPost, postState, userDetails}) =>  {
  useEffect(() => {
   getPost()
  }, [])
    console.log(postState.posts);
  if (postState.loading) {
    return <EmptyContainer/>
  }
const Tab = createMaterialBottomTabNavigator();

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data={postState.posts}
        keyExtractor ={(item) => item.id}
        renderItem={({item, index, separators}) => (
          <Post item={item} userDetails={userDetails} keys={item}/>
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={{fontSize: 30, alignItems: 'center', color: '#fcb851', marginTop: '80%'}}>No Post Found</Text>
        </View>
      )}/>
      </SafeAreaView>
    );
  }

  const mapStateToProps = (state) => ({
    postState: state.post,
    userDetails: state.auth.user
  })

  const mapDispatchToProps =  {
    getPost
  }

  Home.propTypes ={
    getPost: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetails: propTypes.object,
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
