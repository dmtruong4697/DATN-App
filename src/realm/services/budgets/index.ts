import { Budget } from "../../models/Budget";
import { Realm } from "realm";
import { getMonthEnd } from "../dateTime";
import { getWalletById } from "../wallets";
import { getTransactionByWalletId } from "../transactions";

export type BudgetType = {
    _id: Realm.BSON.ObjectId;
    name: string;
    total: number;
    period: number;
    repeatType: string;
    startTime: string;
    finishTime: string;
    walletIds: Realm.BSON.ObjectId[];
    unitCurrency: string;
    status: string;
}

export function getAllBudget(
    realm: Realm,
) {
    const budgets = realm.objects<Budget>('Budget');
    return budgets;
};

export function getBudgetById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
    return budget;
};

export function addBudget(
    realm: Realm, 
    budget: BudgetType
) {
    realm.write(() => {
      realm.create('Budget', budget);
    });
};

export function updateBudgetById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    updatedBudget: BudgetType,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);

    realm.write(() => {
        budget!.name = updatedBudget.name;
        budget!.total = updatedBudget.total;
        budget!.walletIds = updatedBudget.walletIds;
        budget!.period = updatedBudget.period;
        budget!.repeatType = updatedBudget.repeatType;
        budget!.startTime = updatedBudget.startTime;
        budget!.finishTime = updatedBudget.finishTime;
        budget!.status = updatedBudget.status;
    })
};

export function deleteBudgetById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);

    realm.write(() => {
        realm.delete(budget);
    })
};

export function renewBudgetById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
    let start = budget!.startTime;
    let finish = budget!.finishTime;

    if(budget!.repeatType == 'day') {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 1);
        start = startDate.toISOString().slice(0, 10);
        finish = startDate.toISOString().slice(0, 10);
    } else if(budget!.repeatType == 'week') {
        const startDate = new Date(finish);
        const finishDate = new Date(finish);

        startDate.setDate(startDate.getDate() + 1);
        finishDate.setDate(finishDate.getDate() + 7);

        start = startDate.toISOString().slice(0, 10);
        finish = finishDate.toISOString().slice(0, 10);
    } else if(budget!.repeatType == 'month') {
        let startDate = new Date(finish);
        let finishDate = new Date(finish);

        startDate.setDate(startDate.getDate() + 1);
        finishDate = getMonthEnd(startDate);

        start = startDate.toISOString().slice(0, 10);
        finish = finishDate.toISOString().slice(0, 10);
    }

    realm.write(() => {
        budget!.startTime = start;
        budget!.finishTime = finish;
    })
};

export function getBudgetDetailById(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
    let total: any;
    let transactions;

    budget!.walletIds.map((walletId) => {
        const trans = getTransactionByWalletId(realm, walletId);
        transactions = trans.filtered('createAt >= $0 AND createAt <= $1', budget!.startTime, budget!.finishTime);
        transactions.forEach((tran) => {
            const wallet = getWalletById(realm, walletId);
            total[wallet!.currencyUnit] = total[wallet!.currencyUnit] + tran.total;
        })
    })

    return {
        total: total,
        transactions: transactions,
    }

};
