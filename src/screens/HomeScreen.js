import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .onSnapshot((snapShot) => {
        setChats(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Login');
      });
  };

  useLayoutEffect(() => {
    console.log(auth()?.currentUser.photoURL);
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth()?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 60,
          }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Icon name="camera-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}>
            <Icon name="pencil" size={20} />
          </TouchableOpacity>
        </View>
      ),
    });
  },[navigation]);

  const enterChat=(id,chatName)=>{
      navigation.navigate("Chat",{
          id,chatName
      })
  }

  return (
    <View>
      <StatusBar hidden />
      <ScrollView style={styles.container}>
        {chats.map(({id, data: {chatName}}) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
});
