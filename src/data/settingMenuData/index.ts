import { NavigationProp } from "@react-navigation/native";
import { SettingStore } from "../../mobx/setting";

export const SettingMenuData1 = [
    {
        id: '1',
        title: 'Language',
        state: '',
        renderToggle: false,
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('ChangeLanguage');
        },
        onPressToggle: () => {},
        toggleState: false,
    },
    {
        id: '2',
        title: 'Date format',
        state: '',
        renderToggle: false,
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
        onPressToggle: () => {},
        toggleState: false,
    },
    {
        id: '3',
        title: 'Theme color',
        state: '',
        renderToggle: false,
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
        onPressToggle: () => {},
        toggleState: false,
    },
    {
        id: '4',
        title: 'Base currency',
        state: '',
        renderToggle: false,
        onPress: (navigation: NavigationProp<any, any>) => {
            // navigation.navigate('Setting');
        },
        onPressToggle: () => {},
        toggleState: false,
    },
]

export const SettingMenuData2 = [
    {
        id: '1',
        title: 'Change Password',
        state: '',
        renderToggle: false,
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('ChangePassword');
        },
        onPressToggle: () => {},
        toggleState: false,
    },
]