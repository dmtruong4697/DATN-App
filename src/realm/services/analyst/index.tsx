import { Realm } from "realm";
import { Transaction } from "../../models/Transaction";
import { getExpensesTotalByTime, getIncomeTotalByTime } from "../transactions";
import { generateWeek } from "../dateTime";
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
            dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit)):'',
            // topLabelComponent: () => (
            //     <Text style={{color: 'blue', fontSize: 12, marginBottom: 6}}>{formatNumber(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10), currencyUnit))}</Text>
            //   ),
        });
    }
    // console.log(result);

    const yTextData = ['0', (max*0.0025).toString(), (max*0.005).toString(), (max*0.0075).toString(), (max).toString()];

    return {
        result: result,
        yTextData: yTextData,
    }
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