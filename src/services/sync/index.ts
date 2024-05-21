import RNFS from 'react-native-fs';
import { addLoan, addLoanSync, deleteAllLoan, getAllLoan } from '../../realm/services/loan';
import { Realm } from "realm";
import { addTransactionSync, deleteAllTransaction, getAllTransaction } from '../../realm/services/transactions';
import { addTransactionType, deleteAllTransactionType, getAllTransactionType } from '../../realm/services/transactionType';
import { addWallet, deleteAllWallet, getAllWallet } from '../../realm/services/wallets';
import axios from 'axios';
import { API } from '../../constants/api';
import { UserStore } from '../../mobx/auth';
import { BudgetType, addBudget, deleteAllBudget, getAllBudget } from '../../realm/services/budgets';
import { addSaving, deleteAllSaving, getAllSaving } from '../../realm/services/saving';
import { addShoppingList, addShoppingListItem, deleteAllShoppingList, deleteAllShoppingListItem, getAllShoppingList, getAllShoppingListItem } from '../../realm/services/shoppingList';
import { NavigationProp } from '@react-navigation/native';
import { SavingType } from '../../screens/addSavingScreen';
import { ObjectId } from "bson";

export const makeDataFile = async (realm: Realm) => {
    try {
        const loans = getAllLoan(realm);
        const transactions = getAllTransaction(realm);
        const transactionTypes = getAllTransactionType(realm);
        const wallets = getAllWallet(realm);

      const loanPath = RNFS.DocumentDirectoryPath + '/loan.json';
      const transactionPath = RNFS.DocumentDirectoryPath + '/transaction.json';
      const typePath = RNFS.DocumentDirectoryPath + '/type.json';
      const walletPath = RNFS.DocumentDirectoryPath + '/wallet.json';

      await RNFS.writeFile(loanPath, JSON.stringify(loans), "utf8");
      await RNFS.writeFile(transactionPath, JSON.stringify(transactions), "utf8");
      await RNFS.writeFile(typePath, JSON.stringify(transactionTypes), "utf8");
      await RNFS.writeFile(walletPath, JSON.stringify(wallets), "utf8");

      console.log("written to file");
      console.log(RNFS.DocumentDirectoryPath);
    } catch (error) { //if the function throws an error, log it out.
      console.log(error);
    }
  };

export const uploadData = async (realm: Realm) => {
  try {
      const loans = getAllLoan(realm);
      const transactions = getAllTransaction(realm);
      const transactionTypes = getAllTransactionType(realm);
      const wallets = getAllWallet(realm);
      const budgets = getAllBudget(realm);
      const savings = getAllSaving(realm);
      const shoppingLists = getAllShoppingList(realm);
      const shoppingListItems = getAllShoppingListItem(realm);
      // console.log(wallets);

      const responce = await axios.post(API + '/upload-user-data', {
        loans: loans,
        transactions: transactions,
        transactionTypes: transactionTypes,
        wallets: wallets,
        budgets: budgets,
        savings: savings,
        shoppingLists: shoppingLists,
        shoppingListItems: shoppingListItems,
      },
    {
      headers: {
        Authorization: UserStore.user.token,
      }
    })

    console.log(responce.status)

  } catch (error) { 
    console.log(error);
  }
};

export async function syncData(
  realm: Realm,
  navigation: NavigationProp<any, any>,
) {
  try {
      const responce = await axios.post(API + '/get-user-data', {
        dataId: UserStore.user.dataId,
      },
      {
        headers: {
          Authorization: UserStore.user.token,
        }
      });

      deleteAllBudget(realm);
      deleteAllLoan(realm);
      deleteAllSaving(realm);
      deleteAllShoppingList(realm);
      deleteAllShoppingListItem(realm);
      deleteAllTransaction(realm);
      deleteAllTransactionType(realm);
      deleteAllWallet(realm);

      if (responce.status == 200) {
          const message = 'Sync Data Successfully';
          const data = responce.data.data;

          data.loans.forEach((item: any) => {
            const newLoan = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name, 
              total: item.total,
              isLoan: item.isLoan,
              createAt: item.createAt,
              walletId: new Realm.BSON.ObjectId(item.walletId),
              people: item.people,
              interest: item.interest,
              cycle: item.cycle,
              note: item.note,
              imageUrl: item.imageUrl,
            };
            addLoanSync(realm, newLoan);
          })
          data.budgets.forEach((item: any) => {
            let result: ObjectId[] = [];
            item.walletIds.map((item: any) => {
                result.push(new Realm.BSON.ObjectId(item));
            })
            const newBudget: BudgetType = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              unitCurrency: item.unitCurrency,
              total: item.total,
              startTime: item.startTime,
              finishTime: item.finishTime,
              period: item.period,
              repeatType: item.repeatType,
              status: item.status,
              walletIds: result,
            };
            addBudget(realm, newBudget);
          })
          data.savings.forEach((item: any) => {
            const newSaving: SavingType = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              currencyUnit: item.currencyUnit,
              total: item.total,
              createAt: item.createAt,
              profit: item.profit,
            };
            addSaving(realm, newSaving);
          })
          data.wallets.forEach((item: any) => {
            const newWallet = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              currencyUnit: item.currencyUnit,
              balance: item.balance,
            };
            addWallet(realm, newWallet);
          })
          data.transactions.forEach((item: any) => {
            const newTransaction = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              income: item.income,
              total: item.total,
              createAt: item.createAt,
              transactionTypeId: new Realm.BSON.ObjectId(item.transactionTypeId),
              walletId: new Realm.BSON.ObjectId(item.walletId),
              note: item.note,
              imageUrl: item.imageUrl,
              createTime: item.createTime,
            };
            addTransactionSync(realm, newTransaction);
          })
          data.transactionTypes.forEach((item: any) => {
            const newType = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              income: item.income,
              iconUrl: item.iconUrl,
            };
            addTransactionType(realm, newType);
          })
          data.shoppingLists.forEach((item: any) => {
            const newList = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              createAt: item.createAt,
              currencyUnit: item.currencyUnit,
              note: item.note,
            };
            addShoppingList(realm, newList);
          })
          data.shoppingListItems.forEach((item: any) => {
            const newItem = {
              _id: new Realm.BSON.ObjectId(item._id),
              name: item.name,
              createAt: item.createAt,
              note: item.note,
              quantity: item.quantity,
              unit: item.unit,
              price: item.price,
              iconUrl: item.iconUrl,
              isDone: item.isDone,
              listId: new Realm.BSON.ObjectId(item.listId),
            };
            addShoppingListItem(realm, newItem);
          })
          return message;
      } else {
          console.log(responce.status);
          const message = responce.data.message;
          return message;
      }
  } catch (error) {
      let message = '';
      if (axios.isAxiosError(error)) {
          console.error("Error message:", error.message);
          if (error.response) {
            console.error("Error details:", error.response.data);
            message = error.response.data.message;
          }    
        } else {
            // console.error("Unhandled error:", error);
            console.log(error)
            message = 'Unhandled error';
          }

      UserStore.setIsLoading(false);
      return message;
  }
}