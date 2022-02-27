import React, {useState, useEffect} from 'react';
import {Image, View, Text, TouchableOpacity, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
  NativeBaseProvider,
} from 'native-base';
import database from '@react-native-firebase/database';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = ({item, userDetails}) => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);

  const likePost = () => {
    database()
      .ref(`/posts/${item.id}/likes/${userDetails.uid}`)
      .set({
        like: 1,
      })
  };
  const disLikePost = () => {
    database()
      .ref(`/posts/${item.id}/likes/${userDetails.uid}`)
      .set({
        disLike: 1,
      })
  };
    useEffect(() => {
      console.log(item)
      if (item.likes) {
        let like = 0
        let disLike = 0

        Object.values(item.likes).map((val) => {
          if (val.like) {
            like +=1
          }
          if(val.disLike) {
            disLike +=1
          }
        })
        setLike(like)
        setDisLike(disLike)
      } 
    }, [item]);
  return (
    <NativeBaseProvider>
      <View
        style={{
          backgroundColor: '#0f4c75',
          marginVertical: 10,
          marginHorizontal: 8,
          borderRadius: 6,
          padding: 6,
        }}>
        <View style={{flexDirection: 'row', marginVertical: 6}}>
          <Image
            source={{uri: item.userImage}}
            style={{
              height: 42,
              width: 42,
              borderRadius: 21,
              marginHorizontal: 8,
            }}
          />
          <View>
            <Text style={{fontSize: 18, color: '#ffa24a', fontWeight: 'bold'}}>
              {item.by}
            </Text>
            <Text style={{fontSize: 12, color: '#6088a8'}}>
              {`Bio - ${item.userBio}`}
            </Text>
          </View>
        </View>
        <Image
          source={{uri: item.picture}}
          style={{
            height: 300,
            width: '95%',
            flex: 1,
            marginLeft: '2.5%',
            borderRadius: 5,
            margin: 4,
          }}
        />
        <Text style={{fontSize: 22, color: 'white', marginLeft: 4}}>
          {item.description}
        </Text>
        <Text style={{fontSize: 16, color: '#6088a8', marginLeft: 4}}>
          {`At - ${item.location}`}
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 4}}>
          <TouchableOpacity onPress={likePost}>
            <Fontisto
              name="like"
              style={{fontSize: 22, color: '#fdcb9e', padding: 4}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fdcb9e',
              marginTop: 5,
            }}>
            {like}
          </Text>
          <TouchableOpacity onPress={disLikePost}>
            <Fontisto
              name="dislike"
              style={{fontSize: 22, color: '#fdcb9e', padding: 4, marginLeft: 12, marginTop: 4}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fdcb9e',
              marginTop: 6,
            }}>
            {disLike}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`instagram://user?username=${item.instaId}`);
            }}
            style={{flexDirection: 'row'}}>
            <Text style={{color: '#fdcb9e', padding: 4, marginLeft: '38%'}}>
              Open User in Insta
            </Text>
            <Fontisto
              name="instagram"
              style={{fontSize: 22, color: '#fdcb9e', padding: 4}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default Post;
