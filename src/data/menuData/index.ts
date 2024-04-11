import { NavigationProp } from "@react-navigation/native";
import { logout } from "../../services/auth";
import { UserStore } from "../../mobx/auth";
import { User } from "realm";

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
]

export const MenuData2 = [
    {
        id: '1',
        title: 'Currency Convert',
        backgroundColor: 'white',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('Convert');
        },
    },
    {
        id: '2',
        title: 'Loan/Debt',
        backgroundColor: 'white',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('LoanList');
        },
    },
    {
        id: '3',
        title: 'Shopping List',
        backgroundColor: 'white',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Convert');
        },
    },
    {
        id: '4',
        title: 'Group',
        backgroundColor: 'white',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('GroupList');
        },
    },
]

export const MenuData3 = [
    {
        id: '1',
        iconUrl: require('../../../assets/icon/menu/transaction.png'),
        title: 'Sign Out',
        onPress: (navigation: NavigationProp<any, any>) => {
            logout(navigation, UserStore.user.id, UserStore.deviceToken)
        },
    },
]