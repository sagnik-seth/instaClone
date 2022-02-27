import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Box,
  Button,
  VStack,
  NativeBaseProvider,
  FormControl,
  Center,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {options} from '../utils/options';
//redux
import {connect} from 'react-redux';
import Proptypes from 'prop-types';
import shortid from 'shortid';

const AddPost = ({navigation, userState}) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].fileName);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };
  const TakePhoto = async () => {
    launchCamera(options, response => {
      console.log('Response = ', response.assets);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
      uploadImage(response);

      }
    });
  };

  const uploadImage = async (response) => {
    setImageUploading(true);
    const reference = storage().ref(response.assets[0].fileName);
    const task = reference.putFile(response.assets[0].uri);
    task.on('state_changed', (taskSnopshot) => {
      const percentage =
        (taskSnopshot.bytesTransferred / taskSnopshot.totalBytes)
      setUploadStatus(percentage);
    });
    task.then(async () => {
      const url = await reference.getDownloadURL();
      setImage(url);
      setImageUploading(false);
    });
  };
  const addPost = async () => {
    try {
      console.log(image);
      if (!location || !description || !image) {
        console.log(image);
        return Snackbar.show({
          text: 'Please add all field',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }
      const uid = shortid.generate();

      await database().ref(`/posts/${uid}`).set({
        location,
        description,
        picture: image,
        by: userState.name,
        date: Date.now(),
        instaId: userState.instaUserName,
        userImage: userState.image,
        userBio: userState.bio,
        id: uid
      });
      console.log('POST ADDED');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Post upload failed',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScrollView style={{backgroundColor: '#1d3540'}}>
      <NativeBaseProvider>
        <Center w="100%">
          <Box safeArea p="2" w="90%" py="8">
            <VStack space={5} mt="4">
            <Image
                  source={{uri: image}}
                  style={{width: null, height: 150, marginVertical: 15}}
                  resizeMode="center"
                />
              {imageUploading ? (
                <ProgressBar progress={uploadStatus} style={styles.progress} />
              ) : (
                <>
                  <TouchableOpacity key={1} onPress={chooseImage}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        justifyContent: 'center',
                      }}>
                      <FontAwesome
                        style={{padding: 10}}
                        name="photo"
                        size={30}
                        color="#fcb851"
                      />
                      <Text style={{color: '#fcb851', alignSelf: 'center'}}>
                        {' '}
                        Choose Image
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity key={2} onPress={TakePhoto}>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        justifyContent: 'center',
                      }}>
                      <Entypo
                        style={{padding: 10}}
                        name="camera"
                        size={30}
                        color="#fcb851"
                      />
                      <Text style={{color: '#fcb851', alignSelf: 'center'}}>
                        {' '}
                        Click a Photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
                
              )}

              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Location"
                  value={location}
                  onChangeText={text => setLocation(text)}
                />
              </FormControl>
              <FormControl>
                <Input
                  color={'#ffffff'}
                  placeholder="Description"
                  value={description}
                  onChangeText={text => setDescription(text)}
                  paddingBottom="10%"
                />
              </FormControl>
              <Button mt="2" padding={4} colorScheme="indigo" onPress={addPost}>
                AddPost
              </Button>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: {
    marginBottom: 20,
  },
  icon: {fontSize: 20, color: '#fdcb9e'},
  image: {width: null, height: 150, marginVertical: 15},
  progress: {width: null, marginBottom: 20},
});

const mapStateToProps = (state) => ({
  userState: state.auth.user,
});

AddPost.Proptypes = {
  userState: Proptypes.object.isRequired,
};

export default connect(mapStateToProps)(AddPost);
