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

// export function renewBudgetById(
//     realm: Realm,
//     _id: Realm.BSON.ObjectId,
// ) {
//     const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
//     let start = budget!.startTime;
//     let finish = budget!.finishTime;

//     if(budget!.repeatType == 'day') {
//         const startDate = new Date(start);
//         startDate.setDate(startDate.getDate() + 1);
//         start = startDate.toISOString().slice(0, 10);
//         finish = startDate.toISOString().slice(0, 10);
//     } else if(budget!.repeatType == 'week') {
//         const startDate = new Date(finish);
//         const finishDate = new Date(finish);

//         startDate.setDate(startDate.getDate() + 1);
//         finishDate.setDate(finishDate.getDate() + 7);

//         start = startDate.toISOString().slice(0, 10);
//         finish = finishDate.toISOString().slice(0, 10);
//     } else if(budget!.repeatType == 'month') {
//         let startDate = new Date(finish);
//         let finishDate = new Date(finish);

//         startDate.setDate(startDate.getDate() + 1);
//         finishDate = getMonthEnd(startDate);

//         start = startDate.toISOString().slice(0, 10);
//         finish = finishDate.toISOString().slice(0, 10);
//     }

//     realm.write(() => {
//         budget!.startTime = start;
//         budget!.finishTime = finish;
//     })
// };

export function getBudgetDetail(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
    startTime: string,
    finishTime: string,
) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
    let total = 0;
    let transactions;

    budget!.walletIds.map((walletId) => {
        const trans = getTransactionByWalletId(realm, walletId);
        transactions = trans.filtered('createAt >= $0 AND createAt <= $1 AND income = $2', startTime, finishTime, false);
        transactions.map((tran) => {
            const wallet = getWalletById(realm, walletId);
            total += tran.total;
        })
    })

    return {
        total: total,
        transactions: transactions,
    }

};

export function deleteAllBudget(
    realm: Realm,
) {
    const budgets = realm.objects<Budget>('Budget');
    realm.write(() => {
        realm.delete(budgets);
    })
};

// cac ham helper
function isNewDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() !== today.getFullYear() ||
      date.getMonth() !== today.getMonth() ||
      date.getDate() !== today.getDate()
    );
  }
  
  function isNewWeek(date: Date): boolean {
    const today = new Date();
    const currentWeek = getWeekNumber(today);
    const targetWeek = getWeekNumber(date);
    return (
      date.getFullYear() !== today.getFullYear() || currentWeek !== targetWeek
    );
  }
  
  function isNewMonth(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() !== today.getFullYear() ||
      date.getMonth() !== today.getMonth()
    );
  }
  
  function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  export function resetBudget(
    realm: Realm,
    _id: Realm.BSON.ObjectId,
  ) {
    const budget = realm.objectForPrimaryKey<Budget>('Budget', _id);
    let start = budget!.startTime;
    let finish = budget!.finishTime;
  
    const currentDate = new Date();
  
    if (budget!.repeatType === 'day' && isNewDay(currentDate)) {
      const startDate = new Date(start);
      startDate.setDate(startDate.getDate() + 1);
      start = startDate.toISOString().slice(0, 10);
      finish = startDate.toISOString().slice(0, 10);
    } else if (budget!.repeatType === 'week' && isNewWeek(currentDate)) {
      const startDate = new Date(finish);
      const finishDate = new Date(finish);
  
      startDate.setDate(startDate.getDate() + 1);
      finishDate.setDate(finishDate.getDate() + 7);
  
      start = startDate.toISOString().slice(0, 10);
      finish = finishDate.toISOString().slice(0, 10);
    } else if (budget!.repeatType === 'month' && isNewMonth(currentDate)) {
      let startDate = new Date(finish);
      let finishDate = new Date(finish);
  
      startDate.setDate(startDate.getDate() + 1);
      finishDate = getMonthEnd(startDate);
  
      start = startDate.toISOString().slice(0, 10);
      finish = finishDate.toISOString().slice(0, 10);
    } else if (budget!.repeatType === 'year') {
      const startDate = new Date(finish);
      const finishDate = new Date(finish);
  
      startDate.setFullYear(startDate.getFullYear() + 1);
      finishDate.setFullYear(finishDate.getFullYear() + 1);
  
      start = startDate.toISOString().slice(0, 10);
      finish = finishDate.toISOString().slice(0, 10);
    }
  
    realm.write(() => {
      budget!.startTime = start;
      budget!.finishTime = finish;
    });
  }
