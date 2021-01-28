import React from 'react'
import {View,Text,StyleSheet,StatusBar} from 'react-native'



const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar hidden/>
            <Text>LETS BUILD SIGNAL</Text>
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    }
})