import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text  >I am register Screen</Text>

      <View style={styles.inputContainer}>
      <Input
          placeholder="Full Name"
          autoFocus
          tyoe="text"
        
        />
       
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {},
  inputContainer:{}
});
