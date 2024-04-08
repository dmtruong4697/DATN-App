import { NavigationProp } from "@react-navigation/native";

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
        backgroundColor: 'pink',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('Convert');
        },
    },
    {
        id: '2',
        title: 'Loan/Debt',
        backgroundColor: 'green',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('LoanList');
        },
    },
    {
        id: '3',
        title: 'Shopping List',
        backgroundColor: 'purple',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Convert');
        },
    },
    {
        id: '4',
        title: 'Loan/Debt',
        backgroundColor: 'green',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('LoanList');
        },
    },
]