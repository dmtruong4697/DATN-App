import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/splashScreen";
import React from 'react'
import SignInScreen from "../../screens/signInScreen";
import HomeNavigator from "../homeNavigator";
import SignUpScreen from "../../screens/signUpScreen";
import ValidateEmailScreen from "../../screens/validateEmailScreen";
import AddTransactionScreen from "../../screens/addTransactionScreen";
import AddTypeScreen from "../../screens/addTypeScreen";
import AddWalletScreen from "../../screens/addWalletScreen";

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
            name="SignUp" 
            component={SignUpScreen}
            options={{
                headerShown: false,
            }} 
        />

        <Stack.Screen 
            name="ValidateEmail" 
            component={ValidateEmailScreen}
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

        <Stack.Screen
            name="AddType"
            component={AddTypeScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="AddWallet"
            component={AddWalletScreen}
            options={{
                headerShown: false,
            }}
        />
      </Stack.Navigator>
  )
}

export default MainNavigator