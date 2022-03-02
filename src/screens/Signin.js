import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Image,
  H3,
  Button,
  NativeBaseProvider,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {signIn} from '../action/auth';
import propTypes from 'prop-types';
import Welcome from './Welcome.png';

const SignIn = ({navigation, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignin = () => {
    if (!email || !password) {
      return Snackbar.show({
        text: 'Please add all field',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
    signIn({email, password});
    console.log(email, password)
  };
  return (
    <ScrollView style={{backgroundColor: '#1d3540'}}>
      <NativeBaseProvider>
        <Center w="100%">
          <Box safeArea p="2" w="90%" py="8">
            <Text style={{fontSize: 25, fontWeight: 'bold', alignSelf: 'center',color: '#fdcb9e' }}>
            Welcome to the InstaClone
            </Text>
            <Image
              source={Welcome}
              style={{width: null, height: 180, marginTop: 30}}
              resizeMode="contain"
              alt="Welcome Text"
            />
            <VStack space={3} mt="4">
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Email"
                  type='email'
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
              </FormControl>
              <Button
                mt="2"
                padding={4}
                colorScheme="indigo"
                onPress={doSignin}>
                Login
              </Button>
              <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{marginTop: 10}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  signIn: (data) => signIn(data)
}

SignIn.propTypes = {
  signIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn);
