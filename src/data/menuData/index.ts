import { NavigationProp } from "@react-navigation/native";

export const MenuData1 = [
    {
        id: '1',
        iconUrl: require('../../../assets/icon/menu/edit.png'),
        title: 'Menu Item 1',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
    },
    {
        id: '2',
        iconUrl: require('../../../assets/icon/menu/edit.png'),
        title: 'Menu Item 2',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
    },
    {
        id: '3',
        iconUrl: require('../../../assets/icon/menu/edit.png'),
        title: 'Menu Item 3',
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
    },
]