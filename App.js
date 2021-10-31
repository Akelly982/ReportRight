import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "./components/pages/Home";
import { HirePurchaseAndLease } from './components/pages/HirePurchaseAndLease';



const Stack = createNativeStackNavigator();

export default function App() {

  
  const HomeLinear = () =>(
      <View style={styles.container}>
        <Text style={styles.myText}> Home Linear shown </Text>
      </View>
  )


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* <Stack.Screen name="HomeLinear" options={{title: "HomeTitle type 1"}} component={HomeLinear}/> */}

        <Stack.Screen name="Home" options={{title: "Report Right"}}>
            {(props) => <Home {...props} x={" @_@ Hello from appjs I dont acturaly use this  "} />}
        </Stack.Screen>


        {/* Calculations pages */}
        {/* These pages dont recieve passed data so used simplified version of setup */}
        <Stack.Screen name="HirePurchaseAndLease" options={{title: "Hire Purchase And Lease"}} component={HirePurchaseAndLease}/>


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
