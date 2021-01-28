import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';

const LoginScreen = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {},
});
