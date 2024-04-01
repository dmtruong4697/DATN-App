import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/splashScreen";
import React, { createContext, useState } from 'react'
import SignInScreen from "../../screens/signInScreen";
import HomeNavigator from "../homeNavigator";
import SignUpScreen from "../../screens/signUpScreen";
import ValidateEmailScreen from "../../screens/validateEmailScreen";
import AddTransactionScreen from "../../screens/addTransactionScreen";
import AddTypeScreen from "../../screens/addTypeScreen";
import AddWalletScreen from "../../screens/addWalletScreen";
import RangePickerScreen from "../../screens/rangePickerScreen";
import CalendarListScreen from "../../screens/calendarListScreen";
import { generateWeek } from "../../realm/services/dateTime";

const Stack = createNativeStackNavigator();

export const RangeContext = createContext<any>(null);

const MainNavigator = () => {

    const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 10));
    const [finishTime, setFinishTime] = useState(new Date().toISOString().slice(0, 10));
    const [inputType, setInputType] = useState(0);
    const [tabData, setTabData] = useState(generateWeek(5).reverse());

  return (
    <RangeContext.Provider value={{startTime, setStartTime, finishTime, setFinishTime, inputType, setInputType, tabData, setTabData}}>
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

        <Stack.Screen
            name="RangePicker"
            component={RangePickerScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="CalendarList"
            component={CalendarListScreen}
            options={{
                headerShown: false,
            }}
        />
      </Stack.Navigator>
    </RangeContext.Provider>
  )
}

export default MainNavigator