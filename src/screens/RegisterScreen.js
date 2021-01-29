import React, {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Button, Input, Image, Text} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const register = async () => {
    // if (password === passwordRepeat) {
    //   try {
    //     await auth().createUserWithEmailAndPassword(email, password);
    //     navigation.goBack()
    //   } catch (error) {
    //     Alert.alert('useSignal', 'An error occured');
    //   }
    // }
    // else{
    //     Alert.alert('useSignal', 'Passwords are not match ')
    // }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
          authUser.user.updateProfile({
              displayName:name,
              photoURL:imageUrl|| "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
          })
navigation.navigate("Home")
      })
      
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text h3 style={{marginBottom: 50}}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          tyoe="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          tyoe="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          tyoe="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Your Image URL (Optional)"
          tyoe="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      <View style={{height: 100}} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
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
