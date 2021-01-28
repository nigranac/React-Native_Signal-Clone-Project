import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {resolveAuthError} from '../functions'

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => alert('OK'))
      .catch((err) => Alert.alert("signalUse",resolveAuthError(err.code)));
  };
  const registerScreen = () => {
    navigation.navigate('Register');
  };

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
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={registerScreen}
        type="outline"
        title="Register"
      />
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
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
