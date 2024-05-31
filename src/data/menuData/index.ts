import { NavigationProp } from "@react-navigation/native";
import { logout } from "../../services/auth";
import { UserStore } from "../../mobx/auth";
import { User } from "realm";
import { ToastAndroid } from "react-native";
import { Realm } from "realm";

const showToast = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
};

export const MenuData1 = [
    {
        id: '1',
        iconUrl: require('../../../assets/icon/menu/setting.png'),
        title: 'Setting',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('Setting');
        },
    },
    {
        id: '2',
        iconUrl: require('../../../assets/icon/menu/wallet.png'),
        title: 'My Wallet',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('MyWallet');
        },
    },
    {
        id: '3',
        iconUrl: require('../../../assets/icon/menu/transaction.png'),
        title: 'Transaction Type',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('TypeList');
        },
    },
    {
        id: '4',
        iconUrl: require('../../../assets/icon/menu/chart.png'),
        title: 'Analyst',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('AnalystMenu');
        },
    },
]

export const MenuData2 = [
    {
        id: '1',
        title: 'Currency Convert',
        backgroundColor: '#4546df',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('Convert');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/currency.png'),
    },
    {
        id: '2',
        title: 'Loan/Debt',
        backgroundColor: '#f6c871',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('LoanList');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/loan.png'),
    },
    {
        id: '3',
        title: 'Shopping List',
        backgroundColor: '#66d3e7',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('ShoppingList');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/shopping.png'),
    },
    {
        id: '4',
        title: 'Group',
        backgroundColor: '#e87838',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('GroupList');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/group.png'),
    },
    {
        id: '5',
        title: 'Personal Tax',
        backgroundColor: '#aa75f7',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('PersonalTax');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/tax.png'),
    },
    {
        id: '6',
        title: 'Nearby ATM',
        backgroundColor: '#58bf56',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('GroupList');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/atm.png'),
    },
    {
        id: '7',
        title: 'Export Data',
        backgroundColor: '#3c84f3',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('ExportData');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/export.png'),
    },
    {
        id: '8',
        title: 'Saving',
        backgroundColor: '#eb5240',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('SavingList');
        },
        iconUrl: require('../../../assets/icon/menu/menu2/saving.png'),
    },
]

export const MenuData3 = [
    {
        id: '1',
        iconUrl: require('../../../assets/icon/menu/logout.png'),
        title: 'Sign Out',
        onPress: async (navigation: NavigationProp<any, any>, realm: Realm) => {
            await logout(navigation, UserStore.user.id, UserStore.deviceToken, realm)
            .then((message: string) => {
                // setMessage(message);
                showToast(message);
            });
        },
    },
]