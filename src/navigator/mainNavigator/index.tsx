import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/splashScreen";
import React from 'react'
import SignInScreen from "../../screens/signInScreen";
import HomeNavigator from "../homeNavigator";

const Stack = createNativeStackNavigator();


const MainNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{
                headerShown: false,
            }} 
        />

        <Stack.Screen 
            name="SignIn" 
            component={SignInScreen}
            options={{
                headerShown: false,
            }} 
        />

        <Stack.Screen
            name="Home"
            component={HomeNavigator}
            options={{
                headerShown: false,
            }}
        />
      </Stack.Navigator>
  )
}

export default MainNavigator