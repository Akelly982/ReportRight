import React, { Component,useState,useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "./components/pages/Home";
import { HirePurchaseAndLease } from './components/pages/HirePurchaseAndLease';
import { HpReportWebView } from './components/pages/HpReportWebView';


const Stack = createNativeStackNavigator();


// you cant call navigation screen changes here in the app.js
// think of this page being more of a navController than a screen.
export default function App() {

  const [reportStr,setReportStr] = useState(null)



  const handleReportStr = (val) => {
      setReportStr(val)
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* <Stack.Screen name="HomeLinear" options={{title: "HomeTitle type 1"}} component={HomeLinear}/> */}

        <Stack.Screen name="Home" options={{title: "Report Right"}}>
            {(props) => <Home {...props} x={" @_@ Hello from appjs I dont acturaly use this "} />}
        </Stack.Screen>


        {/* Calculations pages */}
        {/* These pages dont recieve passed data so used simplified version of setup */}

          {/* HpAndLeaseCalculation */}
          {/* <Stack.Screen name="HirePurchaseAndLease" options={{title: "Hire Purchase And Lease"}} component={HirePurchaseAndLease}/> */}
          <Stack.Screen name="HirePurchaseAndLease" options={{title: "Hire Purchase And Lease"}}>
              {(props) => <HirePurchaseAndLease {...props} reportStr={reportStr} handleReportStr={handleReportStr}/>}
          </Stack.Screen>

          {/* HpAndLeaseCalculation - hpReportWebView*/}
          <Stack.Screen name="HpReportWebView" options={{title: "Hire Purchase Report"}}>
              {(props) => <HpReportWebView {...props} reportStr={reportStr} />}
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
