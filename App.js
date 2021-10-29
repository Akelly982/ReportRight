import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home} from "./components/Home";



const Stack = createNativeStackNavigator();

export default function App() {

  // const HomeLinear = () => {
  //   <View style={HomeStyles.container}>
  //           <Text style={styles.myText}> Home Screen </Text>
  //   </View>
  // }
  
  function HomeLinear(){
    return(
      <View style={styles.container}>
        <Text style={styles.myText}> Home Linear shown </Text>
      </View>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* <Stack.Screen name="HomeLinear" options={{title: "HomeTitle type 1"}} component={HomeLinear}/> */}

        <Stack.Screen name="Home" options={{title: "Report Right"}}>
            {(props) => <Home {...props} x={" @_@ Hello from appjs "} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  myText: {
    backgroundColor: 'yellow',
    color: 'blue',
  }
});
