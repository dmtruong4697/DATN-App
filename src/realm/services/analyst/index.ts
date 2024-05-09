import { Realm } from "realm";
import { Transaction } from "../../models/Transaction";
import { getExpensesTotalByTime, getIncomeTotalByTime } from "../transactions";
import { generateWeek } from "../dateTime";
import { Budget } from "../../models/Budget";


export function getDayOfWeekAnalyst(
    realm: Realm,
    income: boolean,
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

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(startTime.getDate() + i -1);
        // const id = (i + 1).toString(); 
        result.push({
            value: (income)? getIncomeTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)):getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)),
            label: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
        });
    }
    // console.log(result);

    return result;
}

export function getWeekAnalyst(
    realm: Realm,
    numOfWeeks: number,
    income: boolean,
) {
    const weekArray = generateWeek(numOfWeeks);
    const result = [];
    for (let i = numOfWeeks - 1; i >= 0; i--) {
        result.push({
            value: (income)? getIncomeTotalByTime(realm, weekArray[i].startTime, weekArray[i].finishTime):getExpensesTotalByTime(realm, weekArray[i].startTime, weekArray[i].finishTime),
            label: weekArray[i].name.slice(5, 10),
        })
    }

    // console.log(result)
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
            value: getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)),
            label: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)) > 0)? `${date.toISOString().slice(8, 10)}/${date.toISOString().slice(5, 7)}`:'',
            dataPointText: (getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10)) > 0)? formatter.format(getExpensesTotalByTime(realm, date.toISOString().slice(0, 10), date.toISOString().slice(0, 10))):'',
        });
    }

    return result;
}