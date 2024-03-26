import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../screens/dashboardScreen';
import TransactionScreen from '../../screens/transactionScreen';
import BudgetScreen from '../../screens/budgetScreen';
import MenuScreen from '../../screens/menuScreen';
import AddTransactionScreen from '../../screens/addTransactionScreen';
import { Image, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { styles } from './styles';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {

    const screenOptions = {
        tabBarStyle:{
            height: 58,
            paddingBottom: 10,
            paddingTop: 10,
        },

        tabBarItemStyle:{

        },

        tabBarHideOnKeyboard: true,
      };

    return (
        <Tab.Navigator
        {...{ screenOptions }}
        >
            <Tab.Screen 
                name="Dashboard" 
                component={DashboardScreen} 
                options={{
                    tabBarLabel: "Dashboard",
                    headerShown: false,
                    tabBarActiveTintColor: colors.PrimaryColor,
                    tabBarLabelStyle: {
                        fontWeight: '600',
                    },
                    tabBarIcon: ({focused}) => (
                        (focused)?
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/home-active.png')}/>
                        :
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/home-inactive.png')}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="Transaction" 
                component={TransactionScreen} 
                options={{
                    tabBarLabel: "Transactions",
                    headerShown: false,
                    tabBarActiveTintColor: colors.PrimaryColor,
                    tabBarLabelStyle: {
                        fontWeight: '600',
                    },
                    tabBarIcon: ({focused}) => (
                        (focused)?
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/wallet-active.png')}/>
                        :
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/wallet-inactive.png')}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="AddTransaction" 
                component={AddTransactionScreen} 
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: () => (
                        <Image style={styles.imgAddIcon} source={require('../../../assets/icon/homeScreen/add-transaction.png')}/>
                    ),
                    
                }}
            />

            <Tab.Screen 
                name="Budget" 
                component={BudgetScreen} 
                options={{
                    tabBarLabel: "Budgets",
                    headerShown: false,
                    tabBarActiveTintColor: colors.PrimaryColor,
                    tabBarLabelStyle: {
                        fontWeight: '600',
                    },
                    tabBarIcon: ({focused}) => (
                        (focused)?
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/money-active.png')}/>
                        :
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/money-inactive.png')}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="Menu" 
                component={MenuScreen} 
                options={{
                    tabBarLabel: "Menu",
                    headerShown: false,
                    tabBarActiveTintColor: colors.PrimaryColor,
                    tabBarLabelStyle: {
                        fontWeight: '600',
                    },
                    tabBarIcon: ({focused}) => (
                        (focused)?
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/menu-active.png')}/>
                        :
                        <Image style={styles.imgTabBarIcon} source={require('../../../assets/icon/homeScreen/menu-inactive.png')}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
  }
  
  export default HomeNavigator