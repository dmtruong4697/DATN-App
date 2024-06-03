import { NavigationProp } from "@react-navigation/native";

export const AnalystMenuData = [
    {
        id: '1',
        iconUrl: require('../../../assets/icon/analystMenu/am1.png'),
        title: 'Financial Statement',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('FinancialStatement');
        },
    },
    {
        id: '2',
        iconUrl: require('../../../assets/icon/analystMenu/am2.png'),
        title: 'Expense Vs Income',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('ExpenseVsIncome');
        },
    },
    // {
    //     id: '3',
    //     iconUrl: require('../../../assets/icon/analystMenu/am3.png'),
    //     title: 'Phan tich chi tieu',
    //     onPress: (navigation: NavigationProp<any, any>) => {
    //         navigation.navigate('SavingList');
    //     },
    // },
    // {
    //     id: '4',
    //     iconUrl: require('../../../assets/icon/analystMenu/am4.png'),
    //     title: 'Phan tich thu',
    //     onPress: (navigation: NavigationProp<any, any>) => {
    //         navigation.navigate('SavingList');
    //     },
    // },
    {
        id: '5',
        iconUrl: require('../../../assets/icon/analystMenu/am5.png'),
        title: 'Loan/Debt',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('LoanList');
        },
    },
    {
        id: '6',
        iconUrl: require('../../../assets/icon/analystMenu/am5.png'),
        title: 'Test',
        onPress: (navigation: NavigationProp<any, any>) => {
            navigation.navigate('SavingList');
        },
    },
]