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
import { generateDay, generateWeek } from "../../realm/services/dateTime";
import EditProfileScreen from "../../screens/editProfileScreen";
import MyWalletScreen from "../../screens/myWalletScreen";
import TransactionDetailScreen from "../../screens/transactionDetailScreen";
import EditTransactionScreen from "../../screens/editTransactionScreen";
import SettingScreen from "../../screens/settingScreen";
import WalletDetailScreen from "../../screens/walletDetailScreen";
import EditWalletScreen from "../../screens/editWalletScreen";
import TypeListScreen from "../../screens/typeListScreen";
import TypeDetailScreen from "../../screens/typeDetailScreen";
import EditTypeScreen from "../../screens/editTypeScreen";
import ConvertScreen from "../../screens/convertScreen";
import LoanListScreen from "../../screens/loanListScreen";
import AddLoanScreen from "../../screens/addLoanScreen";
import LoanDetailScreen from "../../screens/loanDetail";
import EditLoanScreen from "../../screens/editLoanScreen";
import GroupListScreen from "../../screens/groupListScreen";
import GroupDetailScreen from "../../screens/groupDetailScreen";
import AddGroupScreen from "../../screens/addGroupScreen";
import PersonalTaxScreen from "../../screens/personalTaxScreen";
import ShoppingListScreen from "../../screens/shoppingListScreen";
import ShoppingListDetailScreen from "../../screens/shoppingListDetailScreen";
import AddGroupTransactionScreen from "../../screens/addGroupTransactionScreen";
import SplitMoneyScreen from "../../screens/splitMoneyScreen";
import TaxResultScreen from "../../screens/taxResultScreen";
import SavingListScreen from "../../screens/savingListScreen";
import AddSavingScreen from "../../screens/addSavingScreen";

export type RootStackParamList = {
    Splash: {};

    SignIn: {};

    SignUp: {};

    ValidateEmail: {};

    Home: {};

    AddType: {};

    AddWallet: {};

    RangePicker: {};

    CalendarList: {};

    EditProfile: {};

    MyWallet: {};

    TransactionDetail: {
        _id: Realm.BSON.ObjectId,
    };

    EditTransaction: {
        _id: Realm.BSON.ObjectId,
    };

    Setting: {};

    WalletDetail: {
        _id: Realm.BSON.ObjectId,
    };

    EditWallet: {
        _id: Realm.BSON.ObjectId,
    };

    TypeList: {};

    TypeDetail: {
        _id: Realm.BSON.ObjectId,
    };

    EditType: {
        _id: Realm.BSON.ObjectId,
    };

    Convert: {};

    LoanList: {};

    AddLoan: {};

    LoanDetail: {
        _id: Realm.BSON.ObjectId,
    };

    EditLoan: {
        _id: Realm.BSON.ObjectId,
    };

    GroupList: {};

    GroupDetail: {
        _id: string,
    };

    AddGroup: {};

    PersonalTax: {};

    ShoppingList: {};

    ShoppingListDetail: {
        _id: Realm.BSON.ObjectId,
    };

    AddGroupTransaction: {
        _id: string,
    };

    SplitMoney: {
        _id: string,
    };

    TaxResult: {
        result: Object,
    };

    SavingList: {};

    SavingDetail: {
        _id: Realm.BSON.ObjectId,
    };

    AddSaving: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RangeContext = createContext<any>(null);

const MainNavigator = () => {

    const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 10));
    const [finishTime, setFinishTime] = useState(new Date().toISOString().slice(0, 10));
    const [inputType, setInputType] = useState(0);
    const [tabData, setTabData] = useState(generateDay(5).reverse());

  return (
    <RangeContext.Provider value={{startTime, setStartTime, finishTime, setFinishTime, inputType, setInputType, tabData, setTabData}}>
      <Stack.Navigator initialRouteName="Home">
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

        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="MyWallet"
            component={MyWalletScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="EditTransaction"
            component={EditTransactionScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="WalletDetail"
            component={WalletDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="EditWallet"
            component={EditWalletScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="TypeList"
            component={TypeListScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="TypeDetail"
            component={TypeDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="EditType"
            component={EditTypeScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="Convert"
            component={ConvertScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="LoanList"
            component={LoanListScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="AddLoan"
            component={AddLoanScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="LoanDetail"
            component={LoanDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="EditLoan"
            component={EditLoanScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="GroupList"
            component={GroupListScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="GroupDetail"
            component={GroupDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="AddGroup"
            component={AddGroupScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="PersonalTax"
            component={PersonalTaxScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="ShoppingList"
            component={ShoppingListScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="ShoppingListDetail"
            component={ShoppingListDetailScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="AddGroupTransaction"
            component={AddGroupTransactionScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="SplitMoney"
            component={SplitMoneyScreen}
            options={{
                headerShown: false,
            }}
        />
        
        <Stack.Screen
            name="TaxResult"
            component={TaxResultScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="SavingList"
            component={SavingListScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="AddSaving"
            component={AddSavingScreen}
            options={{
                headerShown: false,
            }}
        />

      </Stack.Navigator>
    </RangeContext.Provider>
  )
}

export default MainNavigator