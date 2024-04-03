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