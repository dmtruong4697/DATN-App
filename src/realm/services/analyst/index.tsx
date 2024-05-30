import { Realm } from "realm";
import { Transaction } from "../../models/Transaction";
import { getExpensesTotalByTime, getIncomeTotalByTime } from "../transactions";
import { generateWeek, getMonthEnd, getMonthStart, getYearEnd, getYearStart } from "../dateTime";
import { Budget } from "../../models/Budget";
import { Text } from "react-native";


export function getDayOfWeekAnalyst(
    realm: Realm,
    income: boolean,
    currencyUnit: string,
) {
    function formatNumber(num: number): string {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + 'b';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'm';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'k';
        }
        return num.toString();
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyUnit,
    });

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
    let max = 0;

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(startTime.getDate() + i -1);
        // const id = (i + 1).toString(); 

        const tmp = (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit);
        if (tmp > max) {max = tmp};
        result.push({
            value: (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
            // dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit)):'',
        });
    }
    // console.log(result);


    return result;
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
    function formatNumber(num: number): string {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + 'b';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'm';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'k';
        }
        return num.toString();
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyUnit,
    });

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
            value: (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit),
            label: `${date.toISOString().slice(8, 10)}`,
            // dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit)):'',
        });
    }
    // console.log(startTime,'   ',finishTime,'   ',startTime.toISOString().slice(0, 10),'   ',(new Date(finishTime.toISOString().slice(0, 10))).getDate());


    return result;
}

export function getYearAnalyst(
    realm: Realm,
    income: boolean,
    currencyUnit: string,
) {

    const startTime = getYearStart(new Date());
    const finishTime = getYearEnd(new Date());
    const result = [];
    
    for (let month = 0; month < 12; month++) {
        const startOfMonth = new Date(startTime.getFullYear(), month, 1);
        const endOfMonth = new Date(startTime.getFullYear(), month + 1, 0);
        // const days = endOfMonth.getDate();

        result.push({
            value: (income)? getIncomeTotalByTime(realm, startOfMonth.toISOString().slice(0, 10), endOfMonth.toISOString().slice(0, 10)):getExpensesTotalByTime(realm, startOfMonth.toISOString().slice(0, 10),endOfMonth.toISOString().slice(0, 10), currencyUnit),
            label: `${startOfMonth.toLocaleString('default', { month: 'short' })}`,
        });
    }

    return result;
}