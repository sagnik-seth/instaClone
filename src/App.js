import React,{useEffect} from 'react';
import {Text, View, StatusBar} from 'react-native';
import 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler]",
]);
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {connect, useDispatch} from 'react-redux'

import AddPost from './screens/AddPost'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Home from './screens/Home'
import CustomHeader from "./layout/CustomHeader"
import User from './screens/User';

import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types'
import database from '@react-native-firebase/database'
import EmptyContainer from './components/EmptyContainer'
import {requestPermission} from './utils/AskPermission'

const Stack = createStackNavigator( )

const App = ({authState}) => {
  const dispatch = useDispatch()

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })

      database()
      .ref(`/users/${user._user.uid}`)
      .on('value',(snapshot) => {
        console.log('user details',snapshot.val())
        dispatch({
          type: SET_USER,
          payload: snapshot.val()
        })
      })

    } else{
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
  }

  useEffect(() => {
    requestPermission()
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber
  }, []);


  if (authState.loading) {
    return <EmptyContainer/>
}

  return (
    <NavigationContainer>
       <StatusBar
        backgroundColor="#0f4c75" />
      <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props}/>
      }}
      >
        {authState.isAuthenticated ? (
          <>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='AddPost' component={AddPost}/>
          <Stack.Screen name='User' component={User}/>
          </>
        ) : (
          <>
          <Stack.Screen name='SignIn' component={Signin}/>
          <Stack.Screen name='SignUp' component={Signup}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 const mapStateToProps = (state) => ({
   authState: state.auth
 })
export default connect(mapStateToProps)(App);
