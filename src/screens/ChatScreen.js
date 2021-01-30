import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            rounded
            source={{
              uri:messages[0]?.data.photoURL ||
                'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            }}
          />
          <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 60,
            marginRight: 20,
          }}>
          <TouchableOpacity>
            <Icon size={24} name="video-outline" color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon size={24} name="phone-outline" color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    firestore()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth().currentUser.displayName,
        email: auth().currentUser.email,
        photoURL: auth().currentUser.photoURL,
      });

    setInput('');
  };

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );

    return unsubscribe;
  }, [route]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar hidden />
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}>
        <TouchableWithoutFeedback>
          <>
            <ScrollView contentContainerStyle={{padding:15}}>
              {messages.map(({id, data}) =>(
                data.email === auth().currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
                placeholder="Signal Message"
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Icon name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  recieverText: {
    color: 'black',
    fontWeight:"500",
    marginLeft:10
  },
  senderText: {
    color: 'white',
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
});
