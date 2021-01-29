import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions={
    headerStyle:{backgroundColor:"#2C6BED"},
    headerTitleStyle:{color:"white"},
    headerTintColor:"white",
    headerTitleAlign:"center"
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={globalScreenOptions}>
        <Stack.Screen  name="Login" component={LoginScreen} />
        <Stack.Screen  name="Register" component={RegisterScreen} />
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen  name="AddChat" component={AddChatScreen} />
        <Stack.Screen  name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
