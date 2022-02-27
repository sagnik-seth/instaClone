import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Image,
  Button,
  NativeBaseProvider,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import {launchImageLibrary} from 'react-native-image-picker';
import {options} from '../utils/options';

//redux
import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';

const SignUp = ({signUp, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://construct-static.com/images/v982/r/uploads/tutorial/0/images/17449/windows-8-user-account_v650.jpg',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        uploadImage(response);
      }
    });
  };
  const uploadImage = async (response) => {
    setImageUploading(true);
    const reference = storage().ref(response.assets[0].fileName);
    const task = reference.putFile(response.assets[0].uri);
    task.on('state_changed', taskSnopshot => {
      const percentage =
        (taskSnopshot.bytesTransferred / taskSnopshot.totalBytes) * 1000;
      setUploadStatus(percentage);
    });
    task.then(async () => {
      const url = await reference.getDownloadURL();
      setImage(url);
      setImageUploading(false);
    });
  };

  const doSignUp = async () => {
    if (!name ||!email || !password || !instaUserName || !country || !bio) {
      return Snackbar.show({
        text: 'Please add all field',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
    signUp({name, email, password, instaUserName, country, bio, image});
  };
  return (
    <ScrollView style={{backgroundColor: '#1d3540'}}>
      <NativeBaseProvider>
        <Center w="100%">
          <Box safeArea p="2" w="90%" py="8">
            <TouchableOpacity onPress={chooseImage}>
              <Image
                style={{
                  alignSelf: 'center',
                  borderRadius: 60,
                  width: 120,
                  height: 120,
                }}
                size="20"
                source={{uri: image}}
                alt="react-native"
              />
            </TouchableOpacity>
            <VStack space={3} mt="4">
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Name"
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Email"
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
              <FormControl>
                <FormControl.Label></FormControl.Label>
                <Input
                  color={'#ffffff'}
                  placeholder="Instagram User Name"
                  value={instaUserName}
                  onChangeText={text => setInstaUserName(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Short bio"
                  value={bio}
                  onChangeText={text => setBio(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Country"
                  value={country}
                  onChangeText={text => setCountry(text)}
                />
              </FormControl>
              <Button
                mt="2"
                padding={4}
                colorScheme="indigo"
                onPress={doSignUp}>
                SignUp
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={{marginTop: 10}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Already have an account, SignIn here
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
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);
