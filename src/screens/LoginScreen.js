import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {};
  const registerScreen=()=>{
      navigation.navigate("Register")
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar hidden />

      <Image
        source={{
          uri:
            'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={{width: 200, height: 200}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          tyoe="email"
          value={email}
          onChange={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          tyoe="password"
          value={email}
          onChange={(text) => setPassword(text)}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button} onPress={registerScreen} type="outline" title="Register" />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    backgroundColor:"white"
  },
  inputContainer: {
      width:300
  },
  button: {
      width:200,
      marginTop:10
  },
});
