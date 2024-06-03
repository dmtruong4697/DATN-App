import { Realm } from "realm";
import { Transaction } from "../../models/Transaction";
import { getExpensesTotalByTime, getIncomeTotalByTime } from "../transactions";
import { generateWeek, getMonthEnd, getMonthStart, getYearEnd, getYearStart } from "../dateTime";
import { Budget } from "../../models/Budget";
import { Dimensions, Text } from "react-native";
import { Wallet } from "../../models/Wallet";
import { Loan } from "../../models/Loan";
import { Saving } from "../../models/Saving";
import { colors } from "../../../constants/colors";


export function getDayOfWeekAnalyst(
    realm: Realm,
    income: boolean,
    currencyUnit: string,
) {
    function getStartOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; 
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2 - dayOfWeek);
    }

    function getEndOfWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7; 
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8 - dayOfWeek);
    }

    const startTime = new Date(getStartOfWeek());
    const finishTime = new Date(getEndOfWeek());
    const result = [];
    const resultList = [];
    let max = 0;

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(startTime.getDate() + i -1);
        // const id = (i + 1).toString(); 

        const tmp = (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit);
        if (tmp > max) {max = tmp};
        result.push({
            value: getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
            frontColor: colors.PrimaryColor,
            spacing: 2,
            // labelWidth: 10,
            // dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit)):'',
        },
        {
            value: getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            frontColor: colors.ErrorColor,
        });

        resultList.push({
            income: getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            expense: getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            title: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
        })
    }
    // console.log(result);


    return {
        result,
        resultList
    };
}

export function getBudgetAnalyst(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    start: string,
    finish: string,
) {

    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: budget!.unitCurrency,
    });

    const startTime = new Date(start);
    const finishTime = new Date(finish);
    const result = [];

    for(let i = 0; i <= Number(finishTime.getDate()) - Number(startTime.getDate()); i++) {
        const date = new Date();
        date.setDate(startTime.getDate() + i);
        result.push({
            value: getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), budget!.unitCurrency),
            label: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), budget!.unitCurrency) > 0)? `${date.toISOString().slice(8, 10)}/${date.toISOString().slice(5, 7)}`:'',
            dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), budget!.unitCurrency) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), budget!.unitCurrency)):'',
        });
    }

    return result;
}

export function formatNumber(num: number): string {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'b';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}


export function getMonthAnalyst(
    realm: Realm,
    income: boolean,
    currencyUnit: string,
) {
    const startTime = getMonthStart(new Date());
    const finishTime = getMonthEnd(new Date());
    const days = (new Date(finishTime.toISOString().slice(0, 10))).getDate() - (new Date(startTime.toISOString().slice(0, 10))).getDate();
    const result = [];
    let max = 0;

    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(startTime.getDate() + i -1);
        // const id = (i + 1).toString(); 

        result.push({
            value: (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            label: `${date.toISOString().slice(8, 10)}`,
            // dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit)):'',
        });
    }
    // console.log(startTime,'   ',finishTime,'   ',startTime.toISOString().slice(0, 10),'   ',(new Date(finishTime.toISOString().slice(0, 10))).getDate());


    return result;
}

// man income vs expense
export function getQuarterAnalyst(
    realm: Realm,
    currencyUnit: string,
) {

    const startTime = getYearStart(new Date());
    const finishTime = getYearEnd(new Date());
    const resultMonth = [];

    for (let month = 0; month < 12; month++) {
        const startOfMonth = new Date(startTime.getFullYear(), month, 1);
        const endOfMonth = new Date(startTime.getFullYear(), month + 1, 0);
        // const days = endOfMonth.getDate();

        resultMonth.push({
            value: getIncomeTotalByTime(realm, startOfMonth.toISOString().slice(0, 10), endOfMonth.toISOString().slice(0, 10), currencyUnit),
            label: (month + 1).toString(),
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 20,
        },
        {
            value: getExpensesTotalByTime(realm, startOfMonth.toISOString().slice(0, 10),endOfMonth.toISOString().slice(0, 10), currencyUnit),
            frontColor: colors.ErrorColor,
        });
    }

    const windowWidth = Dimensions.get('window').width;
    const result = [
        {
            value: resultMonth[0].value + resultMonth[2].value + resultMonth[4].value,
            label: "Quarter I",
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 80,
        },
        {
            value: resultMonth[1].value + resultMonth[3].value + resultMonth[5].value,
            frontColor: colors.ErrorColor,
        },

        {
            value: resultMonth[6].value + resultMonth[8].value + resultMonth[10].value,
            label: "Quarter II",
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 80,
        },
        {
            value: resultMonth[7].value + resultMonth[9].value + resultMonth[11].value,
            frontColor: colors.ErrorColor,
        },

        {
            value: resultMonth[12].value + resultMonth[14].value + resultMonth[16].value,
            label: "Quarter III",
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 80,
        },
        {
            value: resultMonth[13].value + resultMonth[15].value + resultMonth[17].value,
            frontColor: colors.ErrorColor,
        },

        {
            value: resultMonth[18].value + resultMonth[20].value + resultMonth[22].value,
            label: "Quarter IV",
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 80,
        },
        {
            value: resultMonth[19].value + resultMonth[21].value + resultMonth[23].value,
            frontColor: colors.ErrorColor,
        },
    ]

    const resultList = [
        {
            income: resultMonth[0].value + resultMonth[2].value + resultMonth[4].value,
            expense: resultMonth[1].value + resultMonth[3].value + resultMonth[5].value,
            title: "Quarter I",
        },

        {
            income: resultMonth[6].value + resultMonth[8].value + resultMonth[10].value,
            expense: resultMonth[7].value + resultMonth[9].value + resultMonth[11].value,
            title: "Quarter II",
        },

        {
            income: resultMonth[12].value + resultMonth[14].value + resultMonth[16].value,
            expense: resultMonth[13].value + resultMonth[15].value + resultMonth[17].value,
            title: "Quarter III",
        },

        {
            income: resultMonth[18].value + resultMonth[20].value + resultMonth[22].value,
            expense: resultMonth[19].value + resultMonth[21].value + resultMonth[23].value,
            title: "Quarter IV",
        },
    ]

    return { 
        result,
        resultList
    };
}


// man hinh income vs expense
export function getYearAnalyst(
    realm: Realm,
    currencyUnit: string,
) {
    const result = [];
    const resultList = [];
    
    for (let year = -2; year < 3; year++) {
        const today = new Date();
        const yearDate = new Date(today);
        yearDate.setFullYear(today.getFullYear() + year);
        const startOfYear = getYearStart(yearDate);
        const endOfYear = getYearEnd(yearDate);
        // const days = endOfMonth.getDate();

        result.push({
            value: getIncomeTotalByTime(realm, startOfYear.toISOString().slice(0, 10), endOfYear.toISOString().slice(0, 10), currencyUnit),
            label: yearDate.getFullYear().toString(),
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 80,
        },
        {
            value: getExpensesTotalByTime(realm, startOfYear.toISOString().slice(0, 10),endOfYear.toISOString().slice(0, 10), currencyUnit),
            frontColor: colors.ErrorColor,
        });

        resultList.push({
            income: getIncomeTotalByTime(realm, startOfYear.toISOString().slice(0, 10), endOfYear.toISOString().slice(0, 10), currencyUnit),
            expense: getExpensesTotalByTime(realm, startOfYear.toISOString().slice(0, 10),endOfYear.toISOString().slice(0, 10), currencyUnit),
            title: yearDate.getFullYear().toString(),
        })
    }

    return {
        result,
        resultList
    };
}

// man hinh income vs expense
export function getMonthOfYearAnalyst(
    realm: Realm,
    currencyUnit: string,
) {

    const startTime = getYearStart(new Date());
    const finishTime = getYearEnd(new Date());
    const result = [];
    const resultList = [];
    
    for (let month = 0; month < 12; month++) {
        const startOfMonth = new Date(startTime.getFullYear(), month, 1);
        const endOfMonth = new Date(startTime.getFullYear(), month + 1, 0);
        // const days = endOfMonth.getDate();

        result.push({
            value: getIncomeTotalByTime(realm, startOfMonth.toISOString().slice(0, 10), endOfMonth.toISOString().slice(0, 10), currencyUnit),
            label: (month + 1).toString(),
            frontColor: colors.PrimaryColor,
            spacing: 2,
            labelWidth: 20,
        },
        {
            value: getExpensesTotalByTime(realm, startOfMonth.toISOString().slice(0, 10),endOfMonth.toISOString().slice(0, 10), currencyUnit),
            frontColor: colors.ErrorColor,
        });

        resultList.push({
            income: getIncomeTotalByTime(realm, startOfMonth.toISOString().slice(0, 10), endOfMonth.toISOString().slice(0, 10), currencyUnit),
            expense: getExpensesTotalByTime(realm, startOfMonth.toISOString().slice(0, 10),endOfMonth.toISOString().slice(0, 10), currencyUnit),
            title: (month + 1).toString(),
        })
    }

    return {
        result,
        resultList
    };
}


//man hinh tai chinh hien tai
export function getWalletsTotalByUnit(
    realm: Realm,
    unit: string,
) {
    const w = realm.objects<Wallet>('Wallet');

    const wallets = w.filtered('currencyUnit = $0', unit);
    let result = 0;
    wallets.map((item) => {
        result = result + item.balance;
    })

    return result;
}

//man hinh tai chinh hien tai
export function getLoansTotalByUnit(
    realm: Realm,
    unit: string,
) {
    const l = realm.objects<Loan>('Loan');

    let result = 0;
    l.map((item) => {
        const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', item.walletId);
        if(wallet?.currencyUnit == unit && item.isLoan == true) {
            result = result + item.total;
        }
    })

    return result;
}

//man hinh tai chinh hien tai
export function getDebtsTotalByUnit(
    realm: Realm,
    unit: string,
) {
    const l = realm.objects<Loan>('Loan');

    let result = 0;
    l.map((item) => {
        const wallet = realm.objectForPrimaryKey<Wallet>('Wallet', item.walletId);
        if(wallet?.currencyUnit == unit && item.isLoan == false) {
            result = result + item.total;
        }
    })

    return result;
}

//man hinh tai chinh hien tai
export function getSavingsTotalByUnit(
    realm: Realm,
    unit: string,
) {
    const s = realm.objects<Saving>('Saving');

    const savings = s.filtered('currencyUnit = $0', unit);
    let result = 0;
    savings.map((item) => {
        result = result + item.total;
    })

    return result;
}